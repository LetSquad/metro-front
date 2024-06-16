import { Dimmer, Loader } from "semantic-ui-react";

import OrdersDistributionActionCell from "@components/OrdersDistribution/OrdersDistributionActionCell";
import { HOUR_DIVISION_FORMAT_ARRAY, HOURS_OF_DAY_FORMAT_ARRAY } from "@coreUtils/timeUtils";
import { getShortName } from "@coreUtils/utils";
import { EmployeeFieldsName } from "@models/employee/enums";
import { OrdersTimeList } from "@models/order/types";
import { useAppSelector } from "@store/hooks";
import { selectIsOrdersDistributionLoading } from "@store/ordersDistribution/selectors";

import styles from "./styles/OrdersDistributionTable.module.scss";

interface OrdersDistributionTableProps {
    ordersTimeList: OrdersTimeList[];
}

export default function OrdersDistributionTable({ ordersTimeList }: OrdersDistributionTableProps) {
    const isOrdersDistributionLoading = useAppSelector(selectIsOrdersDistributionLoading);

    return (
        <div className={styles.tableContainer}>
            {isOrdersDistributionLoading && (
                <Dimmer active inverted>
                    <Loader />
                </Dimmer>
            )}
            <table cellSpacing="0" cellPadding="0">
                <thead>
                    <tr>
                        <th scope="col" rowSpan={2} className={styles.employeeCell}>
                            Работник
                        </th>
                        {HOURS_OF_DAY_FORMAT_ARRAY.map((hour) => (
                            <th key={`hour-${hour}`} colSpan={hour === "05" ? 30 : 60} scope="col" className={styles.headHourCell}>
                                {hour}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        {HOURS_OF_DAY_FORMAT_ARRAY.map((_hour) =>
                            HOUR_DIVISION_FORMAT_ARRAY.map((minutes) =>
                                _hour === "05" ? (
                                    minutes !== "00" &&
                                    minutes !== "15" && (
                                        <th
                                            key={`hour-minutes-${_hour}-${minutes}`}
                                            scope="col"
                                            colSpan={15}
                                            className={styles.headMinutesCell}
                                        >
                                            {minutes}
                                        </th>
                                    )
                                ) : (
                                    <th
                                        key={`hour-minutes-${_hour}-${minutes}`}
                                        scope="col"
                                        colSpan={15}
                                        className={styles.headMinutesCell}
                                    >
                                        {minutes}
                                    </th>
                                )
                            )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {ordersTimeList.map(({ employee, actions }) => (
                        <tr key={employee.id}>
                            <td className={styles.employeeContentCell}>
                                {getShortName(
                                    employee[EmployeeFieldsName.LAST_NAME],
                                    employee[EmployeeFieldsName.FIRST_NAME],
                                    employee[EmployeeFieldsName.MIDDLE_NAME]
                                )}
                            </td>
                            {actions.map(({ timeStart, timeEnd, actionType, order }) => (
                                <OrdersDistributionActionCell
                                    key={`${employee.id}-${timeStart}-${timeEnd}-${actionType}`}
                                    actionType={actionType}
                                    order={order}
                                    timeStart={timeStart}
                                    timeEnd={timeEnd}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
