import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import { Formik } from "formik";
import { Dimmer, Form, Loader, Message } from "semantic-ui-react";

import axios from "@api/api";
import apiUrls from "@api/apiUrls";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { useToggle } from "@hooks/useToogle";
import { ResetPasswordFieldName } from "@models/auth/enums";
import { ResetPasswordFormValues } from "@models/auth/types";
import { FormFieldType } from "@models/forms/enums";
import { FormFieldProps } from "@models/forms/types";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import FormField from "@parts/FormField";
import FormFieldPlaceholder from "@parts/FormField/Placeholders/FormFieldPlaceholder";
import { getCurrentEmployeeRequest } from "@store/employee/reducer";
import { useAppDispatch } from "@store/hooks";

import { validationSchema } from "./resetPasswordValidator";
import styles from "./styles/ResetPasswordCard.module.scss";

const PasswordFields: FormFieldProps[] = [
    {
        name: ResetPasswordFieldName.PASSWORD,
        label: "Пароль",
        required: true,
        type: FormFieldType.PASSWORD_INPUT,
        placeholder: "Введите пароль",
        withStrength: true
    },
    {
        name: ResetPasswordFieldName.PASSWORD_CONFIRM,
        label: "Подтвердите пароль",
        required: true,
        type: FormFieldType.PASSWORD_INPUT,
        placeholder: "Введите пароль повторно"
    }
];

const initialValue = {
    [ResetPasswordFieldName.PASSWORD]: "",
    [ResetPasswordFieldName.PASSWORD_CONFIRM]: ""
};

export default function ResetPasswordCard() {
    const dispatch = useAppDispatch();

    const [isResetPasswordLoading, setIsResetPasswordLoading] = useState(false);
    const [isResetPasswordLoadingFailed, , setIsResetPasswordLoadingFailedTrue, setIsResetPasswordLoadingFailedFalse] = useToggle();

    const resetPassword = useCallback(
        (values: ResetPasswordFormValues) => {
            setIsResetPasswordLoading(true);
            setIsResetPasswordLoadingFailedFalse();

            axios
                .post(apiUrls.employeesResetPassword(), { newPassword: values[ResetPasswordFieldName.PASSWORD] })
                .then(() => {
                    dispatch(getCurrentEmployeeRequest());
                    toast.success("Пароль успешно изменен");
                })
                .catch(() => setIsResetPasswordLoadingFailedTrue())
                .finally(() => setIsResetPasswordLoading(false));
        },
        [dispatch, setIsResetPasswordLoading, setIsResetPasswordLoadingFailedFalse, setIsResetPasswordLoadingFailedTrue]
    );

    return (
        <div className={styles.resetPassword}>
            {isResetPasswordLoading && (
                <Dimmer active inverted>
                    <Loader />
                </Dimmer>
            )}
            <Formik onSubmit={resetPassword} initialValues={initialValue} validationSchema={validationSchema}>
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit} className={styles.resetPasswordForm}>
                        <h2>Смените временный пароль</h2>
                        <div className={styles.resetPasswordFieldsContainer}>
                            {PasswordFields.map((input) => (
                                <WithSuspense key={input.name} loader={<FormFieldPlaceholder />}>
                                    <FormField {...input} className={styles.resetPasswordField} />
                                </WithSuspense>
                            ))}
                        </div>
                        {isResetPasswordLoadingFailed && (
                            <div className={styles.messageContainer}>
                                {isResetPasswordLoadingFailed && (
                                    <Message
                                        visible
                                        error
                                        className={styles.message}
                                        header="Произошла непредвиденная ошибка"
                                        content="Повторите авторизацию еще раз позднее"
                                    />
                                )}
                            </div>
                        )}
                        <div className={styles.resetPasswordButtonsContainer}>
                            <PrimaryButton className={styles.resetPasswordButton} type="submit">
                                Сменить пароль
                            </PrimaryButton>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
