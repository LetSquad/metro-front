import { useFormikContext } from "formik";
import { Segment } from "semantic-ui-react";

import { EmployeesFiltersFieldsName } from "@models/employee/enums";
import { EmployeesFiltersFormValues } from "@models/employee/types";
import { FormFieldType } from "@models/forms/enums";
import { FormFieldProps } from "@models/forms/types";
import BaseAddEditForm from "@parts/EditForm/BaseAddEditForm";

import styles from "./styles/EmployeesListFilter.module.scss";

const fields: FormFieldProps[] = [
    {
        name: EmployeesFiltersFieldsName.FIRST_NAME,
        label: "Имя сотрудника",
        type: FormFieldType.INPUT,
        placeholder: "Введите имя сотрудника"
    },
    {
        name: EmployeesFiltersFieldsName.LAST_NAME,
        label: "Фамилия сотрудника",
        type: FormFieldType.INPUT,
        placeholder: "Введите фамилию сотрудника"
    },
    {
        name: EmployeesFiltersFieldsName.PHONE,
        label: "Телефон сотрудника",
        type: FormFieldType.PHONE_NUMBER_INPUT,
        placeholder: "Введите телефон сотрудника"
    },
    {
        name: EmployeesFiltersFieldsName.LIGHT_DUTIES,
        label: "Не может переносить тяжести",
        type: FormFieldType.CHECKBOX
    }
];

interface EmployeesListFilterProps {
    isLoading: boolean;
    onFiltersReset: () => void;
}

export default function EmployeesListFilter({ isLoading, onFiltersReset }: EmployeesListFilterProps) {
    const formik = useFormikContext<EmployeesFiltersFormValues>();

    return (
        <Segment className={styles.segment}>
            <BaseAddEditForm
                fields={fields}
                isLoading={isLoading}
                formik={formik}
                submitButtonText="Фильтр"
                cancelButtonText="Сбросить фильтр"
                onCancel={onFiltersReset}
            />
        </Segment>
    );
}
