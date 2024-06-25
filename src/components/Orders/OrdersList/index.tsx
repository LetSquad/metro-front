import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Toast, toast } from "react-hot-toast";

import { FormikProvider, useFormik } from "formik";
import { DateTime } from "luxon";
import { Loader } from "semantic-ui-react";

import OrdersListContent from "@components/Orders/OrdersList/OrdersListContent";
import OrdersListFilter from "@components/Orders/OrdersList/OrdersListFilter";
import OrdersListHeader from "@components/Orders/OrdersList/OrdersListHeader";
import OrdersTable, { initialOrdersTableFieldsState, OrdersTableFieldsState } from "@components/Orders/OrdersList/OrdersTable";
import partsStyles from "@coreStyles/baseParts.module.scss";
import { useToggle } from "@hooks/useToogle";
import useWebsocket from "@hooks/useWebsocket";
import { OrdersFiltersFieldsName } from "@models/order/enums";
import { OrdersFiltersFormValues } from "@models/order/types";
import { WebSocketDataTypeEnum, WebSocketResponseActionEnum } from "@models/websocket/enums";
import { UpdateListWebSocketRequestData, WebSocketResponse } from "@models/websocket/types";
import ListChangedToast from "@parts/ListChangedToast";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { selectCurrentEmployee } from "@store/employee/selectors";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getOrdersRequest, onNextOrdersPageList, resetOrdersPageList } from "@store/specialistOrders/reducer";
import {
    selectIsOrdersLoading,
    selectIsOrdersLoadingFailed,
    selectOrders,
    selectOrdersCurrentPage,
    selectOrdersTotalPages
} from "@store/specialistOrders/selectors";

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
    [OrdersFiltersFieldsName.DATE_FROM]: DateTime.now().toISODate(),
    [OrdersFiltersFieldsName.DATE_TO]: DateTime.now().plus({ day: 1 }).toISODate()
};

export default function OrdersList() {
    const dispatch = useAppDispatch();

    const currentEmployee = useAppSelector(selectCurrentEmployee);

    const storageOrdersTableFields = localStorage.getItem("ordersTableFields");
    const storageOrdersListMod = localStorage.getItem("ordersListMod");

    const [tableFields, setTableFields] = useState(
        storageOrdersTableFields ? (JSON.parse(storageOrdersTableFields) as OrdersTableFieldsState) : initialOrdersTableFieldsState
    );
    const [ordersListMod, toggleOrdersListMod] = useToggle(
        storageOrdersListMod ? (JSON.parse(storageOrdersListMod) as boolean) : true
    );

    const orders = useAppSelector(selectOrders);
    const isOrdersLoading = useAppSelector(selectIsOrdersLoading);
    const isOrdersLoadingFailed = useAppSelector(selectIsOrdersLoadingFailed);
    const currentPageNumber = useAppSelector(selectOrdersCurrentPage);
    const ordersTotalPages = useAppSelector(selectOrdersTotalPages);

    const getOrders = useCallback(
        (values: OrdersFiltersFormValues) => {
            dispatch(getOrdersRequest(values));
        },
        [dispatch]
    );

    const onNextPage = useCallback(() => {
        dispatch(onNextOrdersPageList());
    }, [dispatch]);

    const formik = useFormik<OrdersFiltersFormValues>({
        onSubmit: getOrders,
        initialValues,
        validationSchema,
        validateOnMount: true
    });

    const onWebSocketMessage = useCallback(
        (eventData: WebSocketResponse) => {
            if (eventData.action === WebSocketResponseActionEnum.UPDATE && !isOrdersLoading) {
                toast.custom((t: Toast) => <ListChangedToast onClick={() => getOrders(formik.values)} toast={t} />, {
                    id: "update-orders-list-toast",
                    duration: 120_000
                });
            }
        },
        [formik.values, getOrders, isOrdersLoading]
    );

    const { startSocket } = useWebsocket<UpdateListWebSocketRequestData>(
        { type: WebSocketDataTypeEnum.ORDER_LIST_UPDATE, login: currentEmployee?.login as string },
        onWebSocketMessage
    );

    const onTableFieldsChanged = useCallback((values: OrdersTableFieldsState) => {
        setTableFields(values);
        localStorage.setItem("ordersTableFields", JSON.stringify(values));
    }, []);

    const onOrdersListModChanged = useCallback(() => {
        dispatch(resetOrdersPageList());
        toggleOrdersListMod();
        localStorage.setItem("ordersListMod", JSON.stringify(!ordersListMod));
    }, [dispatch, ordersListMod, toggleOrdersListMod]);

    const ordersList = useMemo(() => {
        if (isOrdersLoading) {
            return (
                <div className={partsStyles.flexBaseCenterContainer}>
                    <Loader active inline="centered" />
                </div>
            );
        }

        if (isOrdersLoadingFailed) {
            return (
                <LoadingErrorBlock isLoadingErrorObjectText="информации о заявках" reload={() => getOrdersRequest(formik.values)} />
            );
        }

        if (orders.length === 0 || !ordersTotalPages) {
            return <div className={partsStyles.flexBaseCenterContainer}>По заданным критериям заявки не найдены</div>;
        }

        return ordersListMod ? (
            <OrdersTable
                orders={orders}
                tableFields={tableFields}
                isOrdersLoading={isOrdersLoading}
                ordersTotalPages={ordersTotalPages}
                currentPageNumber={currentPageNumber}
                onNextPage={onNextPage}
            />
        ) : (
            <OrdersListContent
                orders={orders}
                isOrdersLoading={isOrdersLoading}
                ordersTotalPages={ordersTotalPages}
                currentPageNumber={currentPageNumber}
                onNextPage={onNextPage}
            />
        );
    }, [
        currentPageNumber,
        formik.values,
        isOrdersLoading,
        isOrdersLoadingFailed,
        onNextPage,
        orders,
        ordersListMod,
        ordersTotalPages,
        tableFields
    ]);

    const onFiltersReset = useCallback(() => {
        formik.resetForm();
        getOrders(initialValues);
    }, [formik, getOrders]);

    useEffect(() => {
        getOrders(formik.values);
        startSocket();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        return () => {
            toast.dismiss("update-orders-list-toast");
        };
    }, []);

    return (
        <FormikProvider value={formik}>
            <div className={styles.container}>
                <OrdersListHeader
                    setTableFields={onTableFieldsChanged}
                    tableFields={tableFields}
                    ordersListMod={ordersListMod}
                    toggleOrdersListMod={onOrdersListModChanged}
                />
                <div className={styles.contentContainer}>
                    {ordersList}
                    <div className={styles.filters}>
                        <OrdersListFilter isLoading={isOrdersLoading} onFiltersReset={onFiltersReset} />
                    </div>
                </div>
            </div>
        </FormikProvider>
    );
}
