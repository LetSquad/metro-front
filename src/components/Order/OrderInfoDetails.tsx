import React, { useCallback, useState } from "react";

import { DateTime } from "luxon";
import { Accordion, AccordionContent, AccordionTitle, Dropdown, DropdownItem, DropdownMenu, Icon, Segment } from "semantic-ui-react";

import MetroLine from "@components/Metro/MetroLine";
import { formatEmployeeCount } from "@coreUtils/employeeUtils";
import { getOrderStatusNameByOrderStatusCodeEnum } from "@coreUtils/orderUtils";
import { formatPassengersCount } from "@coreUtils/passengerUtils";
import { formatMinutesCount } from "@coreUtils/timeUtils";
import { formatPhoneNumber, getFullName, getSexLabelBySexEnum } from "@coreUtils/utils";
import { useToggle } from "@hooks/useToogle";
import { Sex } from "@models/common/enums";
import { EmployeeFieldsName, EmployeeRole } from "@models/employee/enums";
import { OrderFieldsName, OrderStatusCodeEnum } from "@models/order/enums";
import { Order, OrderStatus } from "@models/order/types";
import { PassengerFieldsName } from "@models/passenger/enums";
import { selectCurrentEmployeeRole } from "@store/employee/selectors";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { updateOrderStatusRequest } from "@store/order/reducer";
import { selectIsOrderUpdating } from "@store/order/selectors";

import styles from "./styles/OrderInfoDetails.module.scss";

interface OrderInfoProps {
    order: Order;
}

export default function OrderInfoDetails({ order }: OrderInfoProps) {
    const dispatch = useAppDispatch();

    const isOrderUpdating = useAppSelector(selectIsOrderUpdating);
    const currentEmployeeRole = useAppSelector(selectCurrentEmployeeRole);

    const isUserExecutor = currentEmployeeRole === EmployeeRole.EXECUTOR;

    const [isPhonesOpen, togglePhoneAccordion] = useToggle();
    const [isEmployeesOpen, toggleEmployeesAccordion] = useToggle();
    const [status, setStatus] = useState(order.orderStatus);

    const onStatusChanged = useCallback(
        (_status: OrderStatus) => {
            setStatus(_status);
            dispatch(updateOrderStatusRequest({ orderId: order.id, status: _status.code })).then((payload) => {
                if (payload.type === updateOrderStatusRequest.rejected.type) {
                    setStatus(order.orderStatus);
                }
            });
        },
        [dispatch, order.id, order.orderStatus]
    );

    return (
        <Segment className={styles.segment}>
            <div className={styles.content}>
                <div className={styles.firstBlock}>
                    <Dropdown text={status.name} loading={isOrderUpdating} disabled={isOrderUpdating}>
                        <DropdownMenu>
                            {Object.values(OrderStatusCodeEnum).map((_status) => {
                                const statusName = getOrderStatusNameByOrderStatusCodeEnum(_status);
                                return (
                                    <DropdownItem
                                        key={_status}
                                        text={getOrderStatusNameByOrderStatusCodeEnum(_status)}
                                        onClick={() => onStatusChanged({ code: _status, name: statusName })}
                                    />
                                );
                            })}
                        </DropdownMenu>
                    </Dropdown>
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
                {!isUserExecutor && (
                    <Accordion>
                        <AccordionTitle index={0} active={isPhonesOpen} onClick={togglePhoneAccordion}>
                            <Icon name="dropdown" />
                            Телефоны пользователя
                        </AccordionTitle>
                        <AccordionContent active={isPhonesOpen}>
                            {order[OrderFieldsName.PASSENGER][PassengerFieldsName.PHONES] &&
                            order[OrderFieldsName.PASSENGER][PassengerFieldsName.PHONES].length > 0 ? (
                                <div className={styles.passengerPhonesContent}>
                                    {order[OrderFieldsName.PASSENGER][PassengerFieldsName.PHONES].map((passengerPhone) => (
                                        <span key={`${order[OrderFieldsName.PASSENGER].id}-${passengerPhone.phone}`}>
                                            {`${formatPhoneNumber(passengerPhone.phone)} - ${passengerPhone.description}`}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                "Телефоны пассажира не указаны"
                            )}
                        </AccordionContent>
                    </Accordion>
                )}
                {order.passenger.comment && <span>{`Информация о пассажире: ${order.passenger.comment}`}</span>}
                {order.baggage ? (
                    <span>{`Багаж: ${order.baggage.type}, ${order.baggage.weight} кг. (${order.baggage.isHelpNeeded ? "нужна помощь" : "помощь не нужна"})`}</span>
                ) : (
                    <span>Багаж отсутствует</span>
                )}
                {order.startDescription && <span>{`Место встречи: ${order.startDescription}`}</span>}
                {order.finishDescription && <span>{`Место назначения: ${order.finishDescription}`}</span>}
                {order.additionalInfo && <span>{`Дополнительная информация о заявке: ${order.additionalInfo}`}</span>}
                <span>{`Сопровождающие: ${order.maleEmployeeCount ? formatEmployeeCount(order.maleEmployeeCount, Sex.MALE) : ""}${order.maleEmployeeCount && order.femaleEmployeeCount ? ", " : ""}${order.femaleEmployeeCount ? formatEmployeeCount(order.femaleEmployeeCount, Sex.FEMALE) : ""}`}</span>
                <Accordion>
                    <AccordionTitle index={0} active={isEmployeesOpen} onClick={toggleEmployeesAccordion}>
                        <Icon name="dropdown" />
                        Назначенные сотрудники
                    </AccordionTitle>
                    <AccordionContent active={isEmployeesOpen}>
                        <div className={styles.employeesContent}>
                            {order[OrderFieldsName.EMPLOYEES] && order[OrderFieldsName.EMPLOYEES].length > 0
                                ? order[OrderFieldsName.EMPLOYEES]?.map((employee, index) => (
                                      <>
                                          <div key={employee.id} className={styles.employeeContent}>
                                              <span>
                                                  {getFullName(
                                                      employee[EmployeeFieldsName.FIRST_NAME],
                                                      employee[EmployeeFieldsName.MIDDLE_NAME],
                                                      employee[EmployeeFieldsName.LAST_NAME]
                                                  )}
                                              </span>
                                              <span>{getSexLabelBySexEnum(employee[EmployeeFieldsName.SEX])}</span>
                                              <span>{`Режим работы: ${employee[EmployeeFieldsName.SHIFT]}`}</span>
                                              <span>{`Рабочий телефон: ${employee[EmployeeFieldsName.WORK_PHONE]}`}</span>
                                              <span>{`Персональный телефон: ${employee[EmployeeFieldsName.PERSONAL_PHONE]}`}</span>
                                              <span>
                                                  {employee[EmployeeFieldsName.LIGHT_DUTIES]
                                                      ? "Может носить тяжести"
                                                      : "Нельзя носить тяжести"}
                                              </span>
                                          </div>
                                          {index !== (order[OrderFieldsName.EMPLOYEES]?.length as number) - 1 && (
                                              <div className={styles.divider} />
                                          )}
                                      </>
                                  ))
                                : "Нет назначенных сотрудников"}
                        </div>
                    </AccordionContent>
                </Accordion>
            </div>
            {order.transfers && order.transfers.length > 0 && (
                <div className={styles.metroLineContainer}>
                    <MetroLine transfers={order.transfers} />
                </div>
            )}
        </Segment>
    );
}
