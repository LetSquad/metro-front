import { useFormikContext } from "formik";
import { Segment } from "semantic-ui-react";

import { getPassengerCategoryShortNameByPassengerCategoryCodeEnum } from "@coreUtils/passengerUtils";
import { FormFieldType } from "@models/forms/enums";
import { DropdownOption, FormFieldProps } from "@models/forms/types";
import { PassengerCategoryCodeEnum, PassengersFiltersFieldsName } from "@models/passenger/enums";
import { PassengersFiltersFormValues } from "@models/passenger/types";
import BaseAddEditForm from "@parts/EditForm/BaseAddEditForm";

import styles from "./styles/PassengersListFilter.module.scss";

const PassengerCategoryOptions: DropdownOption[] = Object.values(PassengerCategoryCodeEnum).map((categoryCode) => ({
    value: categoryCode,
    text: getPassengerCategoryShortNameByPassengerCategoryCodeEnum(categoryCode)
}));

const fields: FormFieldProps[] = [
    {
        name: PassengersFiltersFieldsName.FIRST_NAME,
        label: "Имя пассажира",
        type: FormFieldType.INPUT,
        placeholder: "Введите имя пассажира"
    },
    {
        name: PassengersFiltersFieldsName.LAST_NAME,
        label: "Фамилия пассажира",
        type: FormFieldType.INPUT,
        placeholder: "Введите фамилию пассажира"
    },
    {
        name: PassengersFiltersFieldsName.PHONE,
        label: "Телефон пассажира",
        type: FormFieldType.PHONE_NUMBER_INPUT,
        placeholder: "Введите телефон пассажира"
    },
    {
        name: PassengersFiltersFieldsName.CATEGORIES,
        options: PassengerCategoryOptions,
        label: "Категория пассажира",
        type: FormFieldType.DROPDOWN,
        multiple: true,
        search: true,
        placeholder: "Выберите категорию пассажира из списка"
    }
];

interface PassengersListFilterProps {
    isLoading: boolean;
}

export default function PassengersListFilter({ isLoading }: PassengersListFilterProps) {
    const formik = useFormikContext<PassengersFiltersFormValues>();

    return (
        <Segment className={styles.segment}>
            <BaseAddEditForm
                fields={fields}
                isLoading={isLoading}
                formik={formik}
                submitButtonText="Фильтр"
                cancelButtonText="Сбросить фильтр"
                onCancel={formik.resetForm}
            />
        </Segment>
    );
}
