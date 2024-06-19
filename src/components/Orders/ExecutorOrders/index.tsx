import React, { useCallback, useEffect } from "react";
import { Toast, toast } from "react-hot-toast";

import { Loader } from "semantic-ui-react";

import { useAxios } from "@api/api";
import apiUrls from "@api/apiUrls";
import OrderCard from "@components/Orders/OrderCard/OrderCard";
import partsStyles from "@coreStyles/baseParts.module.scss";
import useWebsocket from "@hooks/useWebsocket";
import { OrdersResponse } from "@models/order/types";
import { WebSocketDataTypeEnum, WebSocketResponseActionEnum } from "@models/websocket/enums";
import { UpdateListWebSocketRequestData, WebSocketResponse } from "@models/websocket/types";
import ListChangedToast from "@parts/ListChangedToast";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { selectCurrentEmployee } from "@store/employee/selectors";
import { useAppSelector } from "@store/hooks";

import styles from "./styles/ExecutorOrders.module.scss";

export default function ExecutorOrders() {
    const currentEmployee = useAppSelector(selectCurrentEmployee);

    const [{ data, loading: isOrdersLoading, error: isOrdersLoadingFailed }, reloadOrders] = useAxios<OrdersResponse>({
        url: apiUrls.ordersCurrent(),
        method: "GET"
    });

    const onWebSocketMessage = useCallback(
        (eventData: WebSocketResponse) => {
            if (eventData.action === WebSocketResponseActionEnum.UPDATE) {
                toast.custom((t: Toast) => <ListChangedToast onClick={reloadOrders} toast={t} />, {
                    id: "update-current-orders-list-toast",
                    duration: 120_000
                });
            }
        },
        [reloadOrders]
    );

    const { startSocket } = useWebsocket<UpdateListWebSocketRequestData>(
        { type: WebSocketDataTypeEnum.CURRENT_ORDER_LIST_UPDATE, login: currentEmployee?.login as string },
        onWebSocketMessage
    );

    useEffect(() => {
        if (data) {
            startSocket();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        return () => {
            toast.dismiss("update-current-orders-list-toast");
        };
    }, []);

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

    if (!data || data.list.length === 0) {
        return <div className={partsStyles.flexBaseCenterContainer}>Назначенные заявки не найдены</div>;
    }

    return (
        <div className={styles.container}>
            {data.list.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    );
}
