import React, { useCallback, useEffect } from "react";
import { Toast, toast } from "react-hot-toast";

import { Loader } from "semantic-ui-react";

import OrderDistributionHeader from "@components/OrdersDistribution/OrderDistributionHeader";
import OrdersDistributionTable from "@components/OrdersDistribution/OrdersDistributionTable";
import partsStyles from "@coreStyles/baseParts.module.scss";
import useWebsocket from "@hooks/useWebsocket";
import { WebSocketDataTypeEnum } from "@models/websocket/enums";
import { UpdateListWebSocketRequestData, UpdateListWebSocketResponse } from "@models/websocket/types";
import ListChangedToast from "@parts/ListChangedToast";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { selectCurrentEmployee } from "@store/employee/selectors";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getOrdersTimeListRequest } from "@store/ordersDistribution/reducer";
import {
    selectIsOrdersTimesListLoading,
    selectIsOrdersTimesListLoadingFailed,
    selectOrdersTimesList
} from "@store/ordersDistribution/selectors";

export default function OrdersDistribution() {
    const dispatch = useAppDispatch();

    const currentEmployee = useAppSelector(selectCurrentEmployee);
    const ordersTimeList = useAppSelector(selectOrdersTimesList);
    const isOrdersTimesListLoading = useAppSelector(selectIsOrdersTimesListLoading);
    const isOrdersTimesListLoadingFailed = useAppSelector(selectIsOrdersTimesListLoadingFailed);

    const getOrdersTimeList = useCallback(() => {
        dispatch(getOrdersTimeListRequest());
    }, [dispatch]);

    const onWebSocketMessage = useCallback(() => {
        toast.custom((t: Toast) => <ListChangedToast onClick={getOrdersTimeList} toast={t} />, {
            id: "update-orders-time-list-toast",
            duration: 120_000
        });
    }, [getOrdersTimeList]);

    const { startSocket } = useWebsocket<UpdateListWebSocketRequestData, UpdateListWebSocketResponse>(
        [{ type: WebSocketDataTypeEnum.ORDER_LIST_UPDATE, login: currentEmployee?.login as string }],
        onWebSocketMessage
    );

    useEffect(() => {
        getOrdersTimeList();
        startSocket();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isOrdersTimesListLoadingFailed) {
        return <LoadingErrorBlock isLoadingErrorObjectText="информации о заявках" reload={getOrdersTimeList} />;
    }

    if (isOrdersTimesListLoading) {
        return (
            <div className={partsStyles.flexBaseCenterContainer}>
                <Loader active inline="centered" />
            </div>
        );
    }

    return (
        <>
            <OrderDistributionHeader />
            <OrdersDistributionTable ordersTimeList={ordersTimeList} />
        </>
    );
}
