import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { Formik } from "formik";
import { Dimmer, Form, Loader, Message } from "semantic-ui-react";

import axios from "@api/api";
import apiUrls from "@api/apiUrls";
import { validationSchema } from "@components/Auth/SignIn/signInValidation";
import authStyles from "@components/Auth/styles/AuthForm.module.scss";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { useToggle } from "@hooks/useToogle";
import { SignInFieldName } from "@models/auth/enums";
import { SignInFormValues, SignInResponse } from "@models/auth/types";
import { FormFieldType } from "@models/forms/enums";
import { FormFieldProps } from "@models/forms/types";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import FormField from "@parts/FormField/FormField";
import FormFieldPlaceholder from "@parts/FormField/Placeholders/FormFieldPlaceholder";
import { setAuth, setIsLoginOpen, setRole } from "@store/info/reducer";

import styles from "./styles/SignInCard.module.scss";

const Inputs: FormFieldProps[] = [
    {
        name: SignInFieldName.PHONE,
        label: "Номер телефона",
        required: true,
        type: FormFieldType.PHONE_NUMBER_INPUT,
        placeholder: "Введите адрес номер телефона"
    },
    {
        name: SignInFieldName.PASSWORD,
        label: "Пароль",
        required: true,
        type: FormFieldType.PASSWORD_INPUT,
        placeholder: "Введите пароль"
    }
];

const initialValue = {
    [SignInFieldName.PHONE]: "",
    [SignInFieldName.PASSWORD]: ""
};

export default function SignInCard() {
    const dispatch = useDispatch();

    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isLoginLoadingFailed, , setIsLoginLoadingFailedTrue, setIsLoginLoadingFailedFalse] = useToggle();
    const [isLoginDataError, , setIsLoginDataErrorTrue, setIsLoginDataErrorFalse] = useToggle();

    const signIn = useCallback(
        (values: SignInFormValues) => {
            setIsLoginLoading(true);
            setIsLoginDataErrorFalse();
            setIsLoginLoadingFailedFalse();
            axios
                .post<SignInResponse>(apiUrls.signIn(), values, {
                    validateStatus: (status: number) => (status >= 200 && status < 300) || status === 401
                })
                .then((response) => {
                    if (response.status === 200) {
                        localStorage.setItem("metro_role", JSON.stringify(response.data.role));
                        dispatch(setRole(response.data.role));
                        dispatch(setAuth(true));
                        dispatch(setIsLoginOpen(false));
                    } else {
                        setIsLoginLoading(false);
                        setIsLoginDataErrorTrue();
                    }
                })
                .catch(() => {
                    // TODO: Добавить обработку типов ошибок и вывод соответствующих сообщений (ошибка сервера, не найден пользователь,
                    // некорректные логин/пароль пользователь не подтвердил регистрацию)
                    setIsLoginLoading(false);
                    setIsLoginLoadingFailedTrue();
                });
        },
        [
            dispatch,
            setIsLoginDataErrorFalse,
            setIsLoginDataErrorTrue,
            setIsLoginLoading,
            setIsLoginLoadingFailedFalse,
            setIsLoginLoadingFailedTrue
        ]
    );

    return (
        <div className={styles.signIn}>
            {isLoginLoading && (
                <Dimmer active inverted>
                    <Loader />
                </Dimmer>
            )}
            <Formik onSubmit={signIn} initialValues={initialValue} validationSchema={validationSchema}>
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit} className={authStyles.authForm}>
                        <h2>Войдите в аккаунт</h2>
                        <div className={authStyles.authFieldsContainer}>
                            {Inputs.map((input) => (
                                <WithSuspense key={input.name} loader={<FormFieldPlaceholder />}>
                                    <FormField {...input} className={authStyles.authField} />
                                </WithSuspense>
                            ))}
                        </div>
                        {(isLoginDataError || isLoginLoadingFailed) && (
                            <div className={authStyles.messageContainer}>
                                {isLoginDataError && (
                                    <Message
                                        visible
                                        error
                                        className={authStyles.message}
                                        header="Введены некорректные данные"
                                        content="Введите корректный логин и пароль и попробуйте снова"
                                    />
                                )}
                                {isLoginLoadingFailed && (
                                    <Message
                                        visible
                                        error
                                        className={authStyles.message}
                                        header="Произошла непредвиденная ошибка"
                                        content="Повторите авторизацию еще раз позднее"
                                    />
                                )}
                            </div>
                        )}
                        <div className={authStyles.authButtonsContainer}>
                            <PrimaryButton className={authStyles.authButton} type="submit">
                                Войти
                            </PrimaryButton>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
