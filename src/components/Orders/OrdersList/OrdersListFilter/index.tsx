import classNames from "classnames";
import { useFormikContext } from "formik";
import { DateTime } from "luxon";
import { Segment } from "semantic-ui-react";

import { getOrderStatusNameByOrderStatusCodeEnum } from "@coreUtils/orderUtils";
import { getPassengerCategoryShortNameByPassengerCategoryCodeEnum } from "@coreUtils/passengerUtils";
import { useToggle } from "@hooks/useToogle";
import { FormFieldType } from "@models/forms/enums";
import { DropdownOption, FormFieldProps } from "@models/forms/types";
import { OrdersFiltersFieldsName, OrderStatusCodeEnum } from "@models/order/enums";
import { OrdersFiltersFormValues } from "@models/order/types";
import { PassengerCategoryCodeEnum } from "@models/passenger/enums";
import BaseAddEditForm from "@parts/EditForm/BaseAddEditForm";

import styles from "./styles/OrdersListFilter.module.scss";

const OrderStatusOptions: DropdownOption[] = Object.values(OrderStatusCodeEnum).map((statusCode) => ({
    value: statusCode,
    text: getOrderStatusNameByOrderStatusCodeEnum(statusCode)
}));

const OrderCategoryOptions: DropdownOption[] = Object.values(PassengerCategoryCodeEnum).map((categoryCode) => ({
    value: categoryCode,
    text: getPassengerCategoryShortNameByPassengerCategoryCodeEnum(categoryCode)
}));

const fields: (fromDate?: string) => FormFieldProps[] = (fromDate) => [
    {
        name: OrdersFiltersFieldsName.PASSENGER_FIRST_NAME,
        label: "Имя пассажира",
        type: FormFieldType.INPUT,
        placeholder: "Введите имя пассажира"
    },
    {
        name: OrdersFiltersFieldsName.PASSENGER_LAST_NAME,
        label: "Фамилия пассажира",
        type: FormFieldType.INPUT,
        placeholder: "Введите фамилию пассажира"
    },
    {
        name: OrdersFiltersFieldsName.PASSENGER_PHONE,
        label: "Телефон пассажира",
        type: FormFieldType.PHONE_NUMBER_INPUT,
        placeholder: "Введите телефон пассажира"
    },
    {
        name: OrdersFiltersFieldsName.EMPLOYEE_FIRST_NAME,
        label: "Имя работника",
        type: FormFieldType.INPUT,
        placeholder: "Введите имя работника"
    },
    {
        name: OrdersFiltersFieldsName.EMPLOYEE_LAST_NAME,
        label: "Фамилия работника",
        type: FormFieldType.INPUT,
        placeholder: "Введите фамилию работника"
    },
    {
        name: OrdersFiltersFieldsName.EMPLOYEE_PHONE,
        label: "Телефон работника",
        type: FormFieldType.PHONE_NUMBER_INPUT,
        placeholder: "Введите телефон работника"
    },
    {
        name: OrdersFiltersFieldsName.ORDER_CATEGORIES,
        options: OrderCategoryOptions,
        label: "Категория заявки",
        type: FormFieldType.DROPDOWN,
        multiple: true,
        search: true,
        placeholder: "Выберите категории заявок из списка"
    },
    {
        name: OrdersFiltersFieldsName.ORDER_STATUSES,
        options: OrderStatusOptions,
        label: "Статус заявки",
        type: FormFieldType.DROPDOWN,
        multiple: true,
        search: true,
        placeholder: "Выберите статусы заявки из списка"
    },
    {
        name: "date",
        label: "Дата заявки",
        type: FormFieldType.FORM_FIELDS_RANGE,
        from: {
            name: OrdersFiltersFieldsName.DATE_FROM,
            type: FormFieldType.DATEPICKER,
            placeholder: "C",
            popperPlacement: "top"
        },
        to: {
            name: OrdersFiltersFieldsName.DATE_TO,
            type: FormFieldType.DATEPICKER,
            placeholder: "По",
            minDate: fromDate ? DateTime.fromISO(fromDate).toJSDate() : undefined,
            popperPlacement: "top"
        }
    }
];

interface OrdersListFilterProps {
    isLoading: boolean;
    onFiltersReset: () => void;
}

export default function OrdersListFilter({ isLoading, onFiltersReset }: OrdersListFilterProps) {
    const [isSidebarOpen, toggleSidebar] = useToggle();

    const formik = useFormikContext<OrdersFiltersFormValues>();

    return (
        <div className={classNames({ [styles.sidebarClose]: !isSidebarOpen, [styles.sidebarOpen]: isSidebarOpen })}>
            <div aria-hidden className={isSidebarOpen ? styles.sidebarButtonOpen : styles.sidebarButton} onClick={toggleSidebar}>
                <p className={styles.sidebarButtonText}>Фильтр</p>
            </div>
            <div
                className={classNames({
                    [styles.filtersSidebarHide]: !isSidebarOpen,
                    [styles.filtersSidebar]: isSidebarOpen
                })}
            >
                <Segment className={styles.segment}>
                    <BaseAddEditForm
                        fields={fields(formik.values[OrdersFiltersFieldsName.DATE_FROM])}
                        isLoading={isLoading}
                        formik={formik}
                        submitButtonText="Фильтр"
                        cancelButtonText="Сбросить фильтр"
                        onCancel={onFiltersReset}
                    />
                </Segment>
            </div>
        </div>
    );
}
