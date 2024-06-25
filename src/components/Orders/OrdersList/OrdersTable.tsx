/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useCallback, useMemo, useRef } from "react";
import { generatePath } from "react-router-dom";

import { DateTime } from "luxon";

import MetroStationElement from "@components/Metro/MetroStationElement";
import basePartsStyles from "@coreStyles/baseParts.module.scss";
import { formatEmployeeCount } from "@coreUtils/employeeUtils";
import { formatPassengersCount } from "@coreUtils/passengerUtils";
import { formatMinutesCount } from "@coreUtils/timeUtils";
import { getFullName } from "@coreUtils/utils";
import { Sex } from "@models/common/enums";
import { TableFieldsState } from "@models/common/types";
import { OrderFieldsName } from "@models/order/enums";
import { Order } from "@models/order/types";
import { PageSlugs } from "@models/pages/enums";

import styles from "./styles/OrdersTable.module.scss";

export interface OrdersTableFieldsState {
    status: TableFieldsState;
    orderTime: TableFieldsState;
    duration: TableFieldsState;
    passenger: TableFieldsState;
    baggage: TableFieldsState;
    startStation: TableFieldsState;
    startDescription: TableFieldsState;
    finishStation: TableFieldsState;
    finishDescription: TableFieldsState;
    employees: TableFieldsState;
    additionalInfo: TableFieldsState;
}

export const initialOrdersTableFieldsState: OrdersTableFieldsState = {
    status: { state: true, title: "Статус" },
    orderTime: { state: true, title: "Время встречи" },
    duration: { state: true, title: "Продолжительность" },
    passenger: { state: true, title: "Пассажир" },
    baggage: { state: false, title: "Багаж" },
    startStation: { state: true, title: "Начальная станция" },
    startDescription: { state: false, title: "Место встречи" },
    finishStation: { state: true, title: "Конечная станция" },
    finishDescription: { state: false, title: "Место назначения" },
    employees: { state: true, title: "Сопровождающие" },
    additionalInfo: { state: false, title: "Дополнительная информация" }
};

interface OrdersTableProps {
    orders: Order[];
    tableFields: OrdersTableFieldsState;
    isOrdersLoading: boolean;
    ordersTotalPages: number;
    currentPageNumber: number;
    onNextPage: () => void;
}

export default function OrdersTable({
    orders,
    tableFields,
    isOrdersLoading,
    ordersTotalPages,
    currentPageNumber,
    onNextPage
}: OrdersTableProps) {
    const observer = useRef<IntersectionObserver>(null);

    const lastOrderElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (isOrdersLoading) {
                return;
            }
            if (observer.current) {
                observer.current.disconnect();
            }
            // @ts-ignore
            observer.current = new IntersectionObserver((entries) => {
                const target = entries[0];
                if (target.isIntersecting && ordersTotalPages && currentPageNumber < ordersTotalPages) {
                    onNextPage();
                }
            });
            if (node) {
                observer.current.observe(node);
            }
        },
        [isOrdersLoading, ordersTotalPages, currentPageNumber, onNextPage]
    );

    const isFieldsEnabled = useMemo(() => {
        let _isFieldsEnabled = false;

        for (const tableFieldKey in tableFields) {
            if (Object.prototype.hasOwnProperty.call(tableFields, tableFieldKey)) {
                _isFieldsEnabled = _isFieldsEnabled || tableFields[tableFieldKey as keyof OrdersTableFieldsState].state;
            }
        }

        return _isFieldsEnabled;
    }, [tableFields]);

    if (!isFieldsEnabled) {
        return (
            <div className={basePartsStyles.flexBaseCenterContainer}>
                <h1>Не выбран ни один столбец для отображения</h1>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <table cellSpacing="0" cellPadding="0">
                <thead>
                    <tr>
                        {Object.entries(tableFields).map(
                            ([key, value]: [string, TableFieldsState]) => value.state && <th key={key}>{value.title}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr
                            className={styles.linkRow}
                            key={order.id}
                            onClick={() =>
                                window.open(generatePath(PageSlugs.ORDER, { orderId: order.id.toString() }), "_blank", "noreferrer")
                            }
                        >
                            {tableFields.status.state && <th>{order.orderStatus.name}</th>}
                            {tableFields.orderTime.state && <th>{DateTime.fromISO(order.orderTime).toFormat("dd.MM.yyyy T")}</th>}
                            {tableFields.duration.state && <th>{formatMinutesCount(order.duration / 60)}</th>}
                            {tableFields.passenger.state && (
                                <th>{`${getFullName(order.passenger.firstName, order.passenger.middleName, order.passenger.lastName)} (${formatPassengersCount(order.passengerCount)}, категория ${order.passengerCategory?.shortName || order.passenger.category.shortName}${order.passenger.hasPacemaker ? ", есть ЭКС" : ""})`}</th>
                            )}
                            {tableFields.baggage.state && (
                                <th>
                                    {order.baggage
                                        ? `${order.baggage.type}, ${order.baggage.weight} кг. (${order.baggage.isHelpNeeded ? "нужна помощь" : "помощь не нужна"})`
                                        : ""}
                                </th>
                            )}
                            {tableFields.startStation.state && (
                                <th className={styles.stationContainer}>
                                    <MetroStationElement station={order[OrderFieldsName.START_STATION]} />
                                </th>
                            )}
                            {tableFields.startDescription.state && <th>{order[OrderFieldsName.START_DESCRIPTION] ?? ""}</th>}
                            {tableFields.finishStation.state && (
                                <th className={styles.stationContainer}>
                                    <MetroStationElement station={order[OrderFieldsName.FINISH_STATION]} />
                                </th>
                            )}
                            {tableFields.finishDescription.state && <th>{order[OrderFieldsName.FINISH_DESCRIPTION] ?? ""}</th>}
                            {tableFields.employees.state && (
                                <th>{`${order.maleEmployeeCount ? formatEmployeeCount(order.maleEmployeeCount, Sex.MALE) : ""}${order.maleEmployeeCount && order.femaleEmployeeCount ? ", " : ""}${order.femaleEmployeeCount ? formatEmployeeCount(order.femaleEmployeeCount, Sex.FEMALE) : ""}`}</th>
                            )}
                            {tableFields.additionalInfo.state && <th>{order[OrderFieldsName.ADDITIONAL_INFO] ?? ""}</th>}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div ref={lastOrderElementRef} />
        </div>
    );
}
