import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo } from "react";
import { toast } from "react-hot-toast";

import classNames from "classnames";
import { FormikProvider, useFormik } from "formik";
import { Dimmer, Form, Label, Loader, Segment } from "semantic-ui-react";

import { getPassengerCategoryShortNameByPassengerCategoryCodeEnum } from "@coreUtils/passengerUtils";
import { getSexLabelBySexEnum } from "@coreUtils/utils";
import useWebsocket from "@hooks/useWebsocket";
import { Sex } from "@models/common/enums";
import { FormFieldType } from "@models/forms/enums";
import { DropdownOption, FormFieldProps } from "@models/forms/types";
import { PassengerCategoryCodeEnum, PassengerFieldsName, PassengerPhoneFieldsName } from "@models/passenger/enums";
import { PassengerFormRef, PassengerFormValues, PassengerPhone } from "@models/passenger/types";
import { WebSocketDataTypeEnum, WebSocketResponseActionEnum } from "@models/websocket/enums";
import { EditPassengerWebSocketRequestData, WebSocketResponse } from "@models/websocket/types";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import UnderscoreButton from "@parts/Buttons/UnderscoreButton";
import ArrayFormFields from "@parts/EditForm/ArrayFormFields";
import BaseFormFields from "@parts/EditForm/BaseFormFields";
import formStyles from "@parts/EditForm/styles/AddEditForm.module.scss";
import { selectCurrentEmployee } from "@store/employee/selectors";
import { useAppSelector } from "@store/hooks";
import { selectIsPassengerUpdating } from "@store/passenger/selectors";

import styles from "./styles/PassengerForm.module.scss";
import { validationSchema } from "./validation";

interface PassengerFormProps {
    passengerId?: number;
    initialValues: Partial<Omit<PassengerFormValues, "phones">> & { phones: Partial<PassengerPhone>[] };
    onSubmit: (values: Partial<Omit<PassengerFormValues, "phones">> & { phones: Partial<PassengerPhone>[] }) => void;
    onCancel?: () => void;
    className?: string;
    isEdit?: boolean;
}

const PassengerCategoryOptions: DropdownOption[] = Object.values(PassengerCategoryCodeEnum).map((categoryCode) => ({
    value: categoryCode,
    text: getPassengerCategoryShortNameByPassengerCategoryCodeEnum(categoryCode)
}));

const SexOptions: DropdownOption[] = Object.values(Sex).map((sex) => ({
    value: sex,
    text: getSexLabelBySexEnum(sex)
}));

const fields: FormFieldProps[] = [
    {
        name: PassengerFieldsName.FIRST_NAME,
        label: "Имя",
        type: FormFieldType.INPUT,
        required: true,
        placeholder: "Введите имя пассажира"
    },
    {
        name: PassengerFieldsName.LAST_NAME,
        label: "Фамилия",
        type: FormFieldType.INPUT,
        required: true,
        placeholder: "Введите фамилию пассажира"
    },
    {
        name: PassengerFieldsName.MIDDLE_NAME,
        label: "Отчество",
        type: FormFieldType.INPUT,
        placeholder: "Введите фамилию пассажира"
    },
    {
        name: PassengerFieldsName.SEX,
        options: SexOptions,
        label: "Пол",
        type: FormFieldType.DROPDOWN,
        required: true,
        placeholder: "Выберите пол пассажира из списка"
    },
    {
        name: PassengerFieldsName.CATEGORY,
        options: PassengerCategoryOptions,
        label: "Категория",
        type: FormFieldType.DROPDOWN,
        search: true,
        required: true,
        placeholder: "Выберите категорию пассажира из списка"
    },
    {
        name: PassengerFieldsName.HAS_PACEMAKER,
        label: "Наличие электрокардиостимулятора",
        type: FormFieldType.CHECKBOX
    },
    {
        name: PassengerFieldsName.COMMENT,
        label: "Дополнительная информация",
        type: FormFieldType.TEXTAREA,
        placeholder: "Укажите дополнительную информацию о пассажире"
    }
];

const PassengerForm = forwardRef(
    (
        { onSubmit, onCancel, initialValues, isEdit = false, className, passengerId = -1 }: PassengerFormProps,
        ref: React.ForwardedRef<PassengerFormRef>
    ) => {
        const isPassengerUpdating = useAppSelector(selectIsPassengerUpdating);
        const currentEmployee = useAppSelector(selectCurrentEmployee);

        const onWebSocketMessage = useCallback(
            (eventData: WebSocketResponse) => {
                if (eventData.action === WebSocketResponseActionEnum.ERROR && !isPassengerUpdating) {
                    toast.error("Данный пассажир сейчас редактируется другим пользователем", {
                        id: `passenger-locked-for-edit-${passengerId}`,
                        duration: 120_000
                    });
                }
            },
            [isPassengerUpdating, passengerId]
        );

        const { startSocket } = useWebsocket<EditPassengerWebSocketRequestData>(
            { type: WebSocketDataTypeEnum.PASSENGER_EDIT, login: currentEmployee?.login as string, id: passengerId },
            onWebSocketMessage
        );

        const formik = useFormik<Partial<Omit<PassengerFormValues, "phones">> & { phones: Partial<PassengerPhone>[] }>({
            onSubmit,
            initialValues,
            validationSchema,
            validateOnMount: true
        });

        useImperativeHandle(
            ref,
            () => ({
                resetForm: formik.resetForm
            }),
            [formik.resetForm]
        );

        const isSubmitDisabled = useMemo(() => Object.keys(formik.errors).length > 0, [formik.errors]);

        useEffect(() => {
            if (isEdit) {
                startSocket();
            }

            return () => {
                if (isEdit) {
                    toast.dismiss(`passenger-locked-for-edit-${passengerId}`);
                }
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <Segment className={styles.segment}>
                <FormikProvider value={formik}>
                    <Form onSubmit={formik.handleSubmit} className={classNames(formStyles.form, className)}>
                        {isPassengerUpdating && (
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        )}
                        <BaseFormFields fields={fields}>
                            <div>
                                <span className={styles.phonesLabel}>Телефоны пользователей</span>
                                <div className={styles.arrayFormFields}>
                                    <ArrayFormFields
                                        values={formik.values}
                                        initialAddValue={{
                                            [PassengerPhoneFieldsName.PHONE]: undefined,
                                            [PassengerPhoneFieldsName.DESCRIPTION]: undefined
                                        }}
                                        arrayFieldName={PassengerFieldsName.PHONES}
                                        fields={(index: number) => [
                                            {
                                                name: `${PassengerFieldsName.PHONES}.${index}.${PassengerPhoneFieldsName.PHONE}`,
                                                label: "Телефон",
                                                type: FormFieldType.PHONE_NUMBER_INPUT,
                                                required: true,
                                                placeholder: "Введите телефон пассажира"
                                            },
                                            {
                                                name: `${PassengerFieldsName.PHONES}.${index}.${PassengerPhoneFieldsName.DESCRIPTION}`,
                                                label: "Описание телефона",
                                                type: FormFieldType.INPUT,
                                                placeholder: "Введите описание телефона пассажира"
                                            }
                                        ]}
                                        addButtonTitle="Добавить телефон"
                                    />
                                    {formik.errors[PassengerFieldsName.PHONES] &&
                                        typeof formik.errors[PassengerFieldsName.PHONES] === "string" && (
                                            <Label className={classNames("pointing", styles.promptLabel)}>
                                                {formik.errors[PassengerFieldsName.PHONES]}
                                            </Label>
                                        )}
                                </div>
                            </div>
                        </BaseFormFields>
                        <div className={formStyles.buttonContainer}>
                            {onCancel && (
                                <UnderscoreButton
                                    onClick={onCancel}
                                    type="button"
                                    loading={isPassengerUpdating}
                                    disabled={isPassengerUpdating}
                                >
                                    Отменить
                                </UnderscoreButton>
                            )}
                            <PrimaryButton
                                className={formStyles.primaryButton}
                                type="submit"
                                disabled={isSubmitDisabled || isPassengerUpdating}
                                loading={isPassengerUpdating}
                            >
                                Сохранить
                            </PrimaryButton>
                        </div>
                    </Form>
                </FormikProvider>
            </Segment>
        );
    }
);

export default PassengerForm;
