import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import classNames from "classnames";

import OrderInfoDetails from "@components/Order/OrderInfoDetails";
import OrderForm from "@components/OrderForm";
import flipEditCardPartsStyles from "@coreStyles/flipEditCardParts.module.scss";
import { useChangeEditSearchParam } from "@hooks/useChangeEditSearchParam";
import { EmployeeRole } from "@models/employee/enums";
import { OrderFieldsName } from "@models/order/enums";
import { Order, OrderFormValues } from "@models/order/types";
import BlockIcons from "@parts/BlockIcons/BlockIcons";
import { selectCurrentEmployeeRole } from "@store/employee/selectors";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { updateOrderRequest } from "@store/order/reducer";

import styles from "./styles/OrderInfo.module.scss";

interface OrderInfoProps {
    order: Order;
}

export default function OrderInfo({ order }: OrderInfoProps) {
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();
    const changeEditParam = useChangeEditSearchParam();

    const currentEmployeeRole = useAppSelector(selectCurrentEmployeeRole);

    const isUserExecutor = currentEmployeeRole === EmployeeRole.EXECUTOR;

    const [isOrderEdit, setIsOrderEdit] = useState((searchParams.get("edit") && !isUserExecutor) || false);

    const changeEditState = useCallback(
        (state: boolean) => {
            setIsOrderEdit(state);
            changeEditParam(state);
        },
        [changeEditParam]
    );

    const onSubmitButtonClicked = useCallback(
        (values: Partial<OrderFormValues>) => {
            dispatch(updateOrderRequest({ ...(values as OrderFormValues), orderId: order.id })).then((payload) => {
                if (payload.type === updateOrderRequest.fulfilled.type) {
                    changeEditState(false);
                }
            });
        },
        [changeEditState, dispatch, order.id]
    );

    const initialValue = useMemo(
        () => ({
            [OrderFieldsName.START_DESCRIPTION]: order[OrderFieldsName.START_DESCRIPTION] ?? undefined,
            [OrderFieldsName.FINISH_DESCRIPTION]: order[OrderFieldsName.FINISH_DESCRIPTION] ?? undefined,
            [OrderFieldsName.ORDER_APPLICATION]: order[OrderFieldsName.ORDER_APPLICATION].code,
            [OrderFieldsName.PASSENGER_COUNT]: order[OrderFieldsName.PASSENGER_COUNT],
            [OrderFieldsName.MALE_EMPLOYEE_COUNT]: order[OrderFieldsName.MALE_EMPLOYEE_COUNT],
            [OrderFieldsName.FEMALE_EMPLOYEE_COUNT]: order[OrderFieldsName.FEMALE_EMPLOYEE_COUNT],
            [OrderFieldsName.ADDITIONAL_INFO]: order[OrderFieldsName.ADDITIONAL_INFO] ?? undefined,
            [OrderFieldsName.ORDER_TIME]: order[OrderFieldsName.ORDER_TIME],
            [OrderFieldsName.PASSENGER]: order[OrderFieldsName.PASSENGER].id,
            [OrderFieldsName.BAGGAGE]: order[OrderFieldsName.BAGGAGE] ?? undefined,
            [OrderFieldsName.PASSENGER_CATEGORY]: order[OrderFieldsName.PASSENGER_CATEGORY]?.code,
            [OrderFieldsName.START_STATION]: order[OrderFieldsName.START_STATION]?.id,
            [OrderFieldsName.FINISH_STATION]: order[OrderFieldsName.FINISH_STATION]?.id,
            [OrderFieldsName.TRANSFERS]: [],
            [OrderFieldsName.EMPLOYEES]: []
        }),
        [order]
    );

    return (
        <div
            className={classNames({
                [flipEditCardPartsStyles.segment]: !isOrderEdit,
                [flipEditCardPartsStyles.segmentEdit]: isOrderEdit
            })}
        >
            {isOrderEdit ? (
                <OrderForm
                    initialValues={initialValue}
                    onSubmit={onSubmitButtonClicked}
                    onCancel={() => changeEditState(false)}
                    className={flipEditCardPartsStyles.editContent}
                    isEdit
                />
            ) : (
                <div className={flipEditCardPartsStyles.info}>
                    {!isUserExecutor && (
                        <div className={styles.actionController}>
                            <BlockIcons onEditClick={() => changeEditState(true)} />
                        </div>
                    )}
                    <OrderInfoDetails order={order} />
                </div>
            )}
        </div>
    );
}
