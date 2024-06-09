import { useMemo } from "react";
import { generatePath, Link } from "react-router-dom";

import classNames from "classnames";
import { DateTime } from "luxon";

import { getOrderTimeListActionIconByOrderTimeListActionEnum } from "@coreUtils/orderUtils";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TimeListActionType } from "@models/order/enums";
import { Order } from "@models/order/types";
import { PageSlugs } from "@models/pages/enums";

import styles from "./styles/OrdersDistributionActionCell.module.scss";

interface OrdersDistributionActionCellProps {
    timeStart: string;
    timeEnd: string;
    actionType: TimeListActionType;
    order?: Order | null;
}

export default function OrdersDistributionActionCell({ timeStart, timeEnd, order, actionType }: OrdersDistributionActionCellProps) {
    const content = useMemo(
        () => (
            <div
                className={classNames({
                    [styles.actionOrder]: actionType === TimeListActionType.ORDER,
                    [styles.actionDowntime]: actionType === TimeListActionType.DOWNTIME,
                    [styles.actionBreak]: actionType === TimeListActionType.BREAK,
                    [styles.actionTransfer]: actionType === TimeListActionType.TRANSFER
                })}
            >
                {getOrderTimeListActionIconByOrderTimeListActionEnum(actionType) ? (
                    <FontAwesomeIcon
                        className={styles.actionOrderLink}
                        icon={getOrderTimeListActionIconByOrderTimeListActionEnum(actionType) as IconProp}
                    />
                ) : null}
            </div>
        ),
        [actionType]
    );

    return (
        <td
            colSpan={Math.abs(DateTime.fromISO(timeStart).diff(DateTime.fromISO(timeEnd), ["minutes"]).minutes / 15)}
            className={classNames(styles.actionCell, {
                [styles.actionNonWorking]: actionType === TimeListActionType.NON_WORKING
            })}
        >
            {actionType !== TimeListActionType.NON_WORKING && actionType !== TimeListActionType.ORDER && content}
            {actionType === TimeListActionType.ORDER && order && (
                <Link to={generatePath(PageSlugs.ORDER, { orderId: order.id.toString() })}>{content}</Link>
            )}
        </td>
    );
}
