/* eslint-disable jsx-a11y/control-has-associated-label */

import { useCallback, useMemo } from "react";
import { generatePath, Link } from "react-router-dom";

import { DateTime } from "luxon";
import { Dimmer, Loader } from "semantic-ui-react";

import MetroStationElement from "@components/Metro/MetroStationElement";
import { formatMinutesCount } from "@coreUtils/timeUtils";
import { getShortName } from "@coreUtils/utils";
import { EmployeeFieldsName } from "@models/employee/enums";
import { Station, StationTransfer } from "@models/metro/types";
import { TimeListActionType } from "@models/order/enums";
import { OrdersTimeList } from "@models/order/types";
import { PageSlugs } from "@models/pages/enums";
import { useAppSelector } from "@store/hooks";
import { selectIsOrdersDistributionLoading } from "@store/ordersDistribution/selectors";

import styles from "./styles/OrdersDistributionTable.module.scss";

interface OrdersDistributionTableProps {
    ordersTimeList: OrdersTimeList[];
}

export default function OrdersDistributionTable({ ordersTimeList }: OrdersDistributionTableProps) {
    const isOrdersDistributionLoading = useAppSelector(selectIsOrdersDistributionLoading);

    const filteredTimeList = useMemo(
        () =>
            ordersTimeList.map((employeeTimeList) => ({
                ...employeeTimeList,
                actions: employeeTimeList.actions.filter((action) => action.actionType === TimeListActionType.ORDER)
            })),
        [ordersTimeList]
    );

    const getTransfersDuration = useCallback((transfers: StationTransfer[]) => {
        let duration = 0;
        for (const transfer of transfers) {
            duration += transfer.duration;
        }

        return formatMinutesCount(duration / 60);
    }, []);

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
                        <th scope="col">ФИО работника</th>
                        <th scope="col">Идентификатор заявки</th>
                        <th scope="col">Время прибытия</th>
                        <th scope="col">Время встречи</th>
                        <th scope="col">Ожидаемое время окончания</th>
                        <th scope="col">Общая продолжительность</th>
                        <th scope="col">Продолжительность маршрута</th>
                        <th scope="col">Станция начала</th>
                        <th scope="col">Станция окончания</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTimeList.map(({ employee, actions }) =>
                        actions.length === 0 ? (
                            <tr key={`table-empty-row-${employee.id}`}>
                                <td>
                                    {getShortName(
                                        employee[EmployeeFieldsName.LAST_NAME],
                                        employee[EmployeeFieldsName.FIRST_NAME],
                                        employee[EmployeeFieldsName.MIDDLE_NAME]
                                    )}
                                </td>
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                            </tr>
                        ) : (
                            actions.map((action, index) => (
                                <tr key={`table-fill-row-${employee.id}-${action.order?.id}`}>
                                    {index === 0 && (
                                        <td rowSpan={actions.length} className={styles.activeCell}>
                                            {getShortName(
                                                employee[EmployeeFieldsName.LAST_NAME],
                                                employee[EmployeeFieldsName.FIRST_NAME],
                                                employee[EmployeeFieldsName.MIDDLE_NAME]
                                            )}
                                        </td>
                                    )}
                                    <td className={styles.activeCell}>
                                        <Link to={generatePath(PageSlugs.ORDER, { orderId: (action.order?.id as number).toString() })}>
                                            {action.order?.id}
                                        </Link>
                                    </td>
                                    <td className={styles.activeCell}>
                                        {DateTime.fromISO(action.timeStart).toFormat("dd.MM.yyyy, HH:mm")}
                                    </td>
                                    <td className={styles.activeCell}>
                                        {DateTime.fromISO(action.order?.orderTime as string).toFormat("dd.MM.yyyy, HH:mm")}
                                    </td>
                                    <td className={styles.activeCell}>
                                        {DateTime.fromISO(action.order?.orderTime as string)
                                            .plus({ seconds: action.order?.duration as number })
                                            .toFormat("dd.MM.yyyy, HH:mm")}
                                    </td>
                                    <td className={styles.activeCell}>
                                        {formatMinutesCount((action.order?.duration as number) / 60)}
                                    </td>
                                    <td className={styles.activeCell}>
                                        {getTransfersDuration(action.order?.transfers as StationTransfer[])}
                                    </td>
                                    <td className={styles.activeCell}>
                                        <MetroStationElement station={action.order?.startStation as Station} />
                                    </td>
                                    <td className={styles.activeCell}>
                                        <MetroStationElement station={action.order?.finishStation as Station} />
                                    </td>
                                </tr>
                            ))
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}
