import { useCallback, useRef } from "react";

import OrderForm from "@components/OrderForm";
import { OrderFieldsName } from "@models/order/enums";
import { OrderFormRef, OrderFormValues } from "@models/order/types";
import { useAppDispatch } from "@store/hooks";
import { createOrderRequest, updateOrderRequest } from "@store/order/reducer";

import styles from "./styles/AddOrder.module.scss";

const initialValue = {
    [OrderFieldsName.START_DESCRIPTION]: undefined,
    [OrderFieldsName.FINISH_DESCRIPTION]: undefined,
    [OrderFieldsName.ORDER_APPLICATION]: undefined,
    [OrderFieldsName.PASSENGER_COUNT]: 1,
    [OrderFieldsName.MALE_EMPLOYEE_COUNT]: 1,
    [OrderFieldsName.FEMALE_EMPLOYEE_COUNT]: 0,
    [OrderFieldsName.ADDITIONAL_INFO]: undefined,
    [OrderFieldsName.ORDER_TIME]: undefined,
    [OrderFieldsName.PASSENGER]: undefined,
    [OrderFieldsName.BAGGAGE]: undefined,
    [OrderFieldsName.PASSENGER_CATEGORY]: undefined,
    [OrderFieldsName.START_STATION]: undefined,
    [OrderFieldsName.FINISH_STATION]: undefined,
    [OrderFieldsName.TRANSFERS]: [],
    [OrderFieldsName.DURATION]: undefined,
    [OrderFieldsName.EMPLOYEES]: []
};

export default function AddOrder() {
    const dispatch = useAppDispatch();

    const addOrderFormRef = useRef<OrderFormRef>(null);

    const onSubmitButtonClicked = useCallback(
        (values: Partial<OrderFormValues>) => {
            dispatch(createOrderRequest({ ...(values as OrderFormValues) })).then((payload) => {
                if (payload.type === updateOrderRequest.fulfilled.type) {
                    addOrderFormRef?.current?.resetForm();
                }
            });
        },
        [dispatch]
    );

    return (
        <div className={styles.container}>
            <OrderForm initialValues={initialValue} onSubmit={onSubmitButtonClicked} ref={addOrderFormRef} />
        </div>
    );
}
