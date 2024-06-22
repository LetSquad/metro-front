import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo } from "react";
import { toast } from "react-hot-toast";

import classNames from "classnames";
import { FormikProvider, useFormik } from "formik";
import { Dimmer, Form, Loader, Segment } from "semantic-ui-react";

import { EMPLOYEE_TIME_SHIFT, getEmployeeRankNameByEmployeeRankCodeEnum } from "@coreUtils/employeeUtils";
import { getSexLabelBySexEnum } from "@coreUtils/utils";
import useWebsocket from "@hooks/useWebsocket";
import { Sex } from "@models/common/enums";
import { EmployeeFieldsName, EmployeeRankCodeEnum } from "@models/employee/enums";
import { EmployeeFormRef, EmployeeFormValues } from "@models/employee/types";
import { FormFieldType } from "@models/forms/enums";
import { DropdownOption, FormFieldProps } from "@models/forms/types";
import { WebSocketDataTypeEnum, WebSocketResponseActionEnum } from "@models/websocket/enums";
import { EditEmployeeWebSocketRequestData, WebSocketResponse } from "@models/websocket/types";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import UnderscoreButton from "@parts/Buttons/UnderscoreButton";
import BaseFormFields from "@parts/EditForm/BaseFormFields";
import formStyles from "@parts/EditForm/styles/AddEditForm.module.scss";
import { selectCurrentEmployee, selectIsEmployeeUpdating } from "@store/employee/selectors";
import { useAppSelector } from "@store/hooks";

import styles from "./styles/EmployeeForm.module.scss";
import { validationSchema } from "./validation";

interface EmployeeFormProps {
    employeeId?: number;
    initialValues: Partial<EmployeeFormValues>;
    onSubmit: (values: Partial<EmployeeFormValues>) => void;
    onCancel?: () => void;
    className?: string;
    isEdit?: boolean;
}

const EmployeeRankOptions: DropdownOption[] = Object.values(EmployeeRankCodeEnum).map((rankCode) => ({
    value: rankCode,
    text: getEmployeeRankNameByEmployeeRankCodeEnum(rankCode)
}));

const SexOptions: DropdownOption[] = Object.values(Sex).map((sex) => ({
    value: sex,
    text: getSexLabelBySexEnum(sex)
}));

const ShiftOptions: DropdownOption[] = EMPLOYEE_TIME_SHIFT.map((timeShift) => ({
    value: timeShift,
    text: timeShift
}));

const fields: FormFieldProps[] = [
    {
        name: EmployeeFieldsName.FIRST_NAME,
        label: "Имя",
        type: FormFieldType.INPUT,
        required: true,
        placeholder: "Введите имя сотрудника"
    },
    {
        name: EmployeeFieldsName.LAST_NAME,
        label: "Фамилия",
        type: FormFieldType.INPUT,
        required: true,
        placeholder: "Введите фамилию сотрудника"
    },
    {
        name: EmployeeFieldsName.MIDDLE_NAME,
        label: "Отчество",
        type: FormFieldType.INPUT,
        placeholder: "Введите фамилию сотрудника"
    },
    {
        name: EmployeeFieldsName.SEX,
        options: SexOptions,
        label: "Пол",
        type: FormFieldType.DROPDOWN,
        required: true,
        placeholder: "Выберите пол сотрудника из списка"
    },
    {
        name: EmployeeFieldsName.WORK_PHONE,
        label: "Рабочий телефон",
        required: true,
        type: FormFieldType.PHONE_NUMBER_INPUT,
        placeholder: "Введите рабочий телефон сотрудника"
    },
    {
        name: EmployeeFieldsName.PERSONAL_PHONE,
        label: "Личный телефон",
        type: FormFieldType.PHONE_NUMBER_INPUT,
        placeholder: "Введите личный телефон сотрудника"
    },
    {
        name: EmployeeFieldsName.EMPLOYEE_NUMBER,
        label: "Табельный номер",
        required: true,
        type: FormFieldType.INPUT,
        inputType: "number",
        placeholder: "Введите табельный номер"
    },
    {
        name: EmployeeFieldsName.RANK,
        options: EmployeeRankOptions,
        label: "Должность",
        type: FormFieldType.DROPDOWN,
        required: true,
        placeholder: "Выберите должность сотрудника из списка"
    },
    {
        name: EmployeeFieldsName.SHIFT,
        options: ShiftOptions,
        label: "Режим работы",
        type: FormFieldType.DROPDOWN,
        required: true,
        placeholder: "Выберите режим работы сотрудника из списка"
    },
    {
        name: EmployeeFieldsName.LIGHT_DUTIES,
        label: "Не может носить тяжести",
        type: FormFieldType.CHECKBOX
    }
];

const EmployeeForm = forwardRef(
    (
        { onSubmit, onCancel, initialValues, isEdit = false, className, employeeId = -1 }: EmployeeFormProps,
        ref: React.ForwardedRef<EmployeeFormRef>
    ) => {
        const isEmployeeUpdating = useAppSelector(selectIsEmployeeUpdating);
        const currentEmployee = useAppSelector(selectCurrentEmployee);

        const onWebSocketMessage = useCallback(
            (eventData: WebSocketResponse) => {
                if (eventData.action === WebSocketResponseActionEnum.ERROR && !isEmployeeUpdating) {
                    toast.error("Данный сотрудник сейчас редактируется другим пользователем", {
                        id: `employee-locked-for-edit-${employeeId}`,
                        duration: 120_000
                    });
                }
            },
            [isEmployeeUpdating, employeeId]
        );

        const { startSocket } = useWebsocket<EditEmployeeWebSocketRequestData>(
            { type: WebSocketDataTypeEnum.EMPLOYEE_EDIT, login: currentEmployee?.login as string, id: employeeId },
            onWebSocketMessage
        );

        const formik = useFormik<Partial<EmployeeFormValues>>({
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
                    toast.dismiss(`employee-locked-for-edit-${employeeId}`);
                }
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <Segment className={styles.segment}>
                <FormikProvider value={formik}>
                    <Form onSubmit={formik.handleSubmit} className={classNames(formStyles.form, className)}>
                        {isEmployeeUpdating && (
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        )}
                        <BaseFormFields fields={fields} />
                        <div className={formStyles.buttonContainer}>
                            {onCancel && (
                                <UnderscoreButton
                                    onClick={onCancel}
                                    type="button"
                                    loading={isEmployeeUpdating}
                                    disabled={isEmployeeUpdating}
                                >
                                    Отменить
                                </UnderscoreButton>
                            )}
                            <PrimaryButton
                                className={formStyles.primaryButton}
                                type="submit"
                                disabled={isSubmitDisabled || isEmployeeUpdating}
                                loading={isEmployeeUpdating}
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

export default EmployeeForm;
