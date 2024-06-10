import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Toast, toast } from "react-hot-toast";

import { FormikProvider, useFormik } from "formik";
import { DateTime } from "luxon";
import { Loader } from "semantic-ui-react";

import { useAxios } from "@api/api";
import apiUrls from "@api/apiUrls";
import OrderCard from "@components/Orders/OrderCard/OrderCard";
import OrdersListFilter from "@components/Orders/OrdersList/OrdersListFilter";
import partsStyles from "@coreStyles/baseParts.module.scss";
import useWebsocket from "@hooks/useWebsocket";
import { OrdersFiltersFieldsName } from "@models/order/enums";
import { OrdersFiltersFormValues, OrdersResponse } from "@models/order/types";
import { WebSocketDataTypeEnum } from "@models/websocket/enums";
import { UpdateListWebSocketRequestData, UpdateListWebSocketResponse } from "@models/websocket/types";
import ListChangedToast from "@parts/ListChangedToast";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { selectCurrentEmployee } from "@store/employee/selectors";
import { useAppSelector } from "@store/hooks";

import { validationSchema } from "./OrdersListFilter/validation";
import styles from "./styles/OrdersList.module.scss";

export const initialValues: OrdersFiltersFormValues = {
    [OrdersFiltersFieldsName.PASSENGER_FIRST_NAME]: undefined,
    [OrdersFiltersFieldsName.PASSENGER_LAST_NAME]: undefined,
    [OrdersFiltersFieldsName.PASSENGER_PHONE]: undefined,
    [OrdersFiltersFieldsName.EMPLOYEE_FIRST_NAME]: undefined,
    [OrdersFiltersFieldsName.EMPLOYEE_LAST_NAME]: undefined,
    [OrdersFiltersFieldsName.EMPLOYEE_PHONE]: undefined,
    [OrdersFiltersFieldsName.ORDER_CATEGORIES]: undefined,
    [OrdersFiltersFieldsName.ORDER_STATUSES]: undefined,
    [OrdersFiltersFieldsName.DATE_FROM]: DateTime.now().toISO(),
    [OrdersFiltersFieldsName.DATE_TO]: DateTime.now().plus({ day: 1 }).toISO()
};

export default function OrdersList() {
    const currentEmployee = useAppSelector(selectCurrentEmployee);

    const [filterValues, setFilterValues] = useState(initialValues);

    const [{ data, loading: isOrdersLoading, error: isOrdersLoadingFailed }, reloadOrders] = useAxios<OrdersResponse>({
        url: apiUrls.orders(),
        method: "GET",
        params: filterValues
    });

    const getOrders = useCallback(() => {
        reloadOrders({ params: filterValues });
    }, [filterValues, reloadOrders]);

    const onWebSocketMessage = useCallback(() => {
        toast.custom((t: Toast) => <ListChangedToast onClick={getOrders} toast={t} />, {
            id: "update-orders-list-toast",
            duration: 120_000
        });
    }, [getOrders]);

    const { startSocket } = useWebsocket<UpdateListWebSocketRequestData, UpdateListWebSocketResponse>(
        [{ type: WebSocketDataTypeEnum.ORDER_LIST_UPDATE, login: currentEmployee?.login as string }],
        onWebSocketMessage
    );

    const onFiltersSubmit = useCallback(
        (values: OrdersFiltersFormValues) => {
            setFilterValues(values);
            reloadOrders({ params: values });
        },
        [reloadOrders]
    );

    const ordersList = useMemo(() => {
        if (isOrdersLoading) {
            return (
                <div className={partsStyles.flexBaseCenterContainer}>
                    <Loader active inline="centered" />
                </div>
            );
        }

        if (isOrdersLoadingFailed) {
            return <LoadingErrorBlock isLoadingErrorObjectText="информации о заявках" reload={reloadOrders} />;
        }

        return <div className={styles.ordersContainer}>{data?.list.map((order) => <OrderCard key={order.id} order={order} />)}</div>;
    }, [data?.list, isOrdersLoading, isOrdersLoadingFailed, reloadOrders]);

    const formik = useFormik<OrdersFiltersFormValues>({
        onSubmit: onFiltersSubmit,
        initialValues,
        validationSchema,
        validateOnMount: true
    });

    useEffect(() => {
        if (data) {
            startSocket();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <FormikProvider value={formik}>
            <div className={styles.container}>
                {ordersList}
                <div className={styles.filters}>
                    <OrdersListFilter isLoading={isOrdersLoading} />
                </div>
            </div>
        </FormikProvider>
    );
}
