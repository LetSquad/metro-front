import React from "react";
import { generatePath, Link } from "react-router-dom";

import { DateTime } from "luxon";
import { Segment } from "semantic-ui-react";

import MetroLine from "@components/Metro/MetroLine";
import { formatEmployeeCount } from "@coreUtils/employeeUtils";
import { formatPassengersCount } from "@coreUtils/passengerUtils";
import { formatMinutesCount } from "@coreUtils/timeUtils";
import { getFullName } from "@coreUtils/utils";
import { Sex } from "@models/common/enums";
import { Order } from "@models/order/types";
import { PageSlugs } from "@models/pages/enums";

import styles from "./styles/OrderCard.module.scss";

interface OrderCardProps {
    order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
    return (
        <Link to={generatePath(PageSlugs.ORDER, { orderId: order.id.toString() })} className={styles.link}>
            <Segment className={styles.segment}>
                <div className={styles.content}>
                    <div className={styles.firstBlock}>
                        <span>{order.orderStatus.name}</span>
                        <div className={styles.firstBlockTimeContainer}>
                            <span>{`Время встречи: ${DateTime.fromISO(order.orderTime).toFormat("dd.MM.yyyy T")}`}</span>
                            <span>{`Ожидаемое время выполнения: ${formatMinutesCount(order.duration / 60)}`}</span>
                        </div>
                    </div>
                    <div className={styles.passengerMainInfoBlock}>
                        <div className={styles.passengerMainInfoBlockNameContainer}>
                            <span>Сопроводить:</span>
                            <span className={styles.passengerMainInfoBlockName}>
                                {getFullName(order.passenger.firstName, order.passenger.middleName, order.passenger.lastName)}
                            </span>
                        </div>
                        <span>{`(${formatPassengersCount(order.passengerCount)}, категория ${order.passengerCategory?.shortName || order.passenger.category.shortName}${order.passenger.hasPacemaker ? ", есть ЭКС" : ""})`}</span>
                    </div>
                    {order.passenger.comment && <span>{`Информация о пассажире: ${order.passenger.comment}`}</span>}
                    {order.baggage ? (
                        <span>{`Багаж: ${order.baggage.type}, ${order.baggage.weight} кг. (${order.baggage.isHelpNeeded ? "нужна помощь" : "помощь не нужна"})`}</span>
                    ) : (
                        <span>Багаж отсутствует</span>
                    )}
                    {order.startDescription && <span>{`Место встречи: ${order.startDescription}`}</span>}
                    {order.finishDescription && <span>{`Место назначения: ${order.finishDescription}`}</span>}
                    {order.additionalInfo && <span>{`Дополнительеная информация о заявке: ${order.additionalInfo}`}</span>}
                    <span>{`Сопровождающие: ${formatEmployeeCount(order.maleEmployeeCount, Sex.MALE)}, ${formatEmployeeCount(order.femaleEmployeeCount, Sex.FEMALE)}`}</span>
                </div>
                {order.transfers && order.transfers.length > 0 && <MetroLine transfers={order.transfers} />}
            </Segment>
        </Link>
    );
}
