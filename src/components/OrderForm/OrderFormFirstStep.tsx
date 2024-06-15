import React, { useCallback, useMemo } from "react";

import classNames from "classnames";
import { useFormikContext } from "formik";
import { DateTime } from "luxon";

import MetroStationElement from "@components/Metro/MetroStationElement";
import { metroStations } from "@coreUtils/metroUtils";
import { getOrderApplicationLabelByOrderApplicationCodeEnum } from "@coreUtils/orderUtils";
import {
    getPassengerCategoryFullNameByPassengerCategoryCodeEnum,
    getPassengerCategoryShortNameByPassengerCategoryCodeEnum
} from "@coreUtils/passengerUtils";
import { getFullName } from "@coreUtils/utils";
import { EmployeeFieldsName } from "@models/employee/enums";
import { FormFieldType } from "@models/forms/enums";
import { DropdownOption } from "@models/forms/types";
import { OrderApplicationCodeEnum, OrderFieldsName } from "@models/order/enums";
import { OrderFormValues } from "@models/order/types";
import { BaggageFieldsName, PassengerCategoryCodeEnum, PassengerFieldsName } from "@models/passenger/enums";
import FormField from "@parts/FormField/FormField";
import loadingErrorBlockStyles from "@parts/LoadingErrorBlock/styles/LoadingErrorBlock.module.scss";
import { getEmployeesRequest } from "@store/employee/reducer";
import { selectEmployees, selectIsEmployeesLoading, selectIsEmployeesLoadingFailed } from "@store/employee/selectors";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getPassengersRequest } from "@store/passenger/reducer";
import { selectIsPassengersLoading, selectIsPassengersLoadingFailed, selectPassengers } from "@store/passenger/selectors";

import styles from "./styles/OrderFormFirstStep.module.scss";

interface OrderFormFirstStepProps {
    isEdit: boolean;
    isReadonly: boolean;
}

const orderApplicationOptions: DropdownOption[] = Object.values(OrderApplicationCodeEnum).map((orderApplication) => ({
    value: orderApplication,
    text: getOrderApplicationLabelByOrderApplicationCodeEnum(orderApplication)
}));

const passengerCategoryOptions: DropdownOption[] = Object.values(PassengerCategoryCodeEnum).map((passengerCategory) => ({
    value: passengerCategory,
    text: `${getPassengerCategoryShortNameByPassengerCategoryCodeEnum(passengerCategory)} (${getPassengerCategoryFullNameByPassengerCategoryCodeEnum(passengerCategory)})`
}));

export default function OrderFormFirstStep({ isEdit, isReadonly }: OrderFormFirstStepProps) {
    const { values } = useFormikContext<Partial<OrderFormValues>>();
    const dispatch = useAppDispatch();

    const passengers = useAppSelector(selectPassengers);
    const isPassengersLoading = useAppSelector(selectIsPassengersLoading);
    const isPassengersLoadingFailed = useAppSelector(selectIsPassengersLoadingFailed);
    const employees = useAppSelector(selectEmployees);
    const isEmployeesLoading = useAppSelector(selectIsEmployeesLoading);
    const isEmployeesLoadingFailed = useAppSelector(selectIsEmployeesLoadingFailed);

    const passengerOptions = useMemo(
        () =>
            passengers.map((passenger) => ({
                value: passenger.id,
                text: `${getFullName(passenger[PassengerFieldsName.FIRST_NAME], passenger[PassengerFieldsName.MIDDLE_NAME], passenger[PassengerFieldsName.LAST_NAME])} (категория ${passenger[PassengerFieldsName.CATEGORY].shortName})`
            })),
        [passengers]
    );

    const employeesOptions = useMemo(
        () =>
            employees.map((employee) => ({
                value: employee.id,
                text: `${getFullName(employee[PassengerFieldsName.FIRST_NAME], employee[PassengerFieldsName.MIDDLE_NAME], employee[PassengerFieldsName.LAST_NAME])} (время работы "${employee[EmployeeFieldsName.SHIFT]}")`
            })),
        [employees]
    );

    const metroStationOptions = useMemo(
        () =>
            metroStations.map((station) => ({
                value: station.id,
                text: station.name,
                content: <MetroStationElement station={station} />
            })),
        []
    );

    const selectedPassenger = useMemo(
        () => passengers.find((passenger) => passenger.id === values.passenger),
        [passengers, values.passenger]
    );

    const filterTimes = useCallback((date: Date) => {
        return (
            (date.getHours() >= 0 && date.getHours() < 1) ||
            (date.getHours() === 1 && date.getMinutes() === 0) ||
            (date.getHours() === 5 && date.getMinutes() >= 30) ||
            (date.getHours() >= 6 && date.getHours() <= 23)
        );
    }, []);

    const errorContent = useCallback(
        (isLoadingErrorObjectText: string, reload: () => void) => (
            <span>
                {`Произошла ошибка при получении ${isLoadingErrorObjectText}. `}
                {"Попробуйте повторить "}
                <span aria-hidden className={loadingErrorBlockStyles.failedContainerLink} onClick={reload}>
                    загрузку
                </span>
            </span>
        ),
        []
    );

    const getPassengers = useCallback(() => {
        dispatch(getPassengersRequest());
    }, [dispatch]);

    const getEmployees = useCallback(() => {
        dispatch(getEmployeesRequest());
    }, [dispatch]);

    return (
        <>
            <FormField
                name={OrderFieldsName.ORDER_TIME}
                type={FormFieldType.DATE_TIMEPICKER}
                label="Дата начала заявки"
                placeholder="Выберите дату начала заявки"
                required
                filterTimes={filterTimes}
                minDate={DateTime.now().plus({ day: 1 }).toJSDate()}
                disabled={isReadonly}
            />
            <FormField
                name={OrderFieldsName.PASSENGER}
                type={FormFieldType.DROPDOWN}
                required
                search
                clearable
                label="Пассажир"
                placeholder="Выбирите пассажира"
                options={passengerOptions}
                isLoading={isPassengersLoading}
                errorText={isPassengersLoadingFailed ? errorContent("пассажиров", getPassengers) : undefined}
                disabled={isReadonly}
            />
            <FormField
                name={OrderFieldsName.PASSENGER_COUNT}
                type={FormFieldType.INPUT}
                inputType="number"
                min={0}
                step={1}
                label="Колличество пассажиров"
                placeholder="Введите колличество пассажиров"
                required
                disabled={isReadonly}
            />
            <FormField
                name={OrderFieldsName.PASSENGER_CATEGORY}
                type={FormFieldType.DROPDOWN}
                search
                clearable
                label="Категория пассажира"
                placeholder={
                    selectedPassenger
                        ? `${selectedPassenger[PassengerFieldsName.CATEGORY].shortName} (${selectedPassenger[PassengerFieldsName.CATEGORY].name})`
                        : "Выберите категорию пассажира"
                }
                options={passengerCategoryOptions}
                disabled={isReadonly}
            />
            <div className={classNames(styles.baggageContainer, { [styles.baggageLabelDisabled]: isReadonly })}>
                <span className={styles.baggageLabel}>Багаж пассажира</span>
                <div className={styles.baggageContent}>
                    <FormField
                        name={`${OrderFieldsName.BAGGAGE}.${BaggageFieldsName.TYPE}`}
                        type={FormFieldType.INPUT}
                        label="Тип багажа"
                        placeholder="Укажите тип багажа"
                        disabled={isReadonly}
                    />
                    <FormField
                        name={`${OrderFieldsName.BAGGAGE}.${BaggageFieldsName.WEIGHT}`}
                        type={FormFieldType.INPUT}
                        inputType="number"
                        min={1}
                        max={100}
                        step={1}
                        label="Вес багажа"
                        placeholder="Укажите вес багажа"
                        disabled={isReadonly}
                    />
                    <FormField
                        name={`${OrderFieldsName.BAGGAGE}.${BaggageFieldsName.IS_HELP_NEEDED}`}
                        type={FormFieldType.CHECKBOX}
                        label="Нужна ли помощь с багажом"
                        disabled={isReadonly}
                    />
                </div>
            </div>
            <FormField
                name={OrderFieldsName.START_STATION}
                type={FormFieldType.DROPDOWN}
                required
                search
                clearable
                label="Начальная станция"
                placeholder="Выберите начальную станцию"
                options={metroStationOptions}
                disabled={isReadonly}
            />
            <FormField
                name={OrderFieldsName.START_DESCRIPTION}
                type={FormFieldType.TEXTAREA}
                label="Описание точки встречи"
                placeholder="Введите описание точки встречи"
                disabled={isReadonly}
            />
            <FormField
                name={OrderFieldsName.FINISH_STATION}
                type={FormFieldType.DROPDOWN}
                required
                search
                clearable
                label="Конечная станция"
                placeholder="Выберите конечную станцию"
                options={metroStationOptions}
                disabled={isReadonly}
            />
            <FormField
                name={OrderFieldsName.FINISH_DESCRIPTION}
                type={FormFieldType.TEXTAREA}
                label="Описание точки прибытия"
                placeholder="Введите описание точки прибытия"
                disabled={isReadonly}
            />
            <FormField
                name={OrderFieldsName.ORDER_APPLICATION}
                type={FormFieldType.DROPDOWN}
                required
                clearable
                label="Способ приема заявки"
                placeholder="Выберите способ приема заявки"
                options={orderApplicationOptions}
                disabled={isReadonly}
            />
            <FormField
                name={OrderFieldsName.ADDITIONAL_INFO}
                type={FormFieldType.TEXTAREA}
                label="Дополнительная информация"
                placeholder="Введите дополнительную информацию по заявке"
                disabled={isReadonly}
            />
            {isEdit && (
                <FormField
                    name={OrderFieldsName.EMPLOYEES}
                    type={FormFieldType.DROPDOWN}
                    search
                    multiple
                    clearable
                    label="Работники"
                    placeholder="Выбирите работников"
                    options={employeesOptions}
                    isLoading={isEmployeesLoading}
                    errorText={isEmployeesLoadingFailed ? errorContent("работников", getEmployees) : undefined}
                    disabled={isReadonly}
                />
            )}
            <FormField
                name={OrderFieldsName.MALE_EMPLOYEE_COUNT}
                type={FormFieldType.INPUT}
                inputType="number"
                min={0}
                step={1}
                label="Колличество сотрудников мужчин"
                placeholder="Введите колличество сотрудников мужчин"
                required
                disabled={isReadonly}
            />
            <FormField
                name={OrderFieldsName.FEMALE_EMPLOYEE_COUNT}
                type={FormFieldType.INPUT}
                inputType="number"
                min={0}
                step={1}
                label="Колличество сотрудников женщин"
                placeholder="Введите колличество сотрудников женщин"
                required
                disabled={isReadonly}
            />
        </>
    );
}
