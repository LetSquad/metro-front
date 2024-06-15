import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Loader } from "semantic-ui-react";

import OrderInfo from "@components/Order/OrderInfo";
import partsStyles from "@coreStyles/baseParts.module.scss";
import ErrorBlock from "@parts/ErrorBlock/ErrorBlock";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { selectIsCurrentEmployeeLoading } from "@store/employee/selectors";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getOrderRequest } from "@store/order/reducer";
import { selectIsOrderLoading, selectIsOrderLoadingFailed, selectOrder } from "@store/order/selectors";

import styles from "./styles/Order.module.scss";

export default function Order() {
    const dispatch = useAppDispatch();

    const { orderId } = useParams();

    const order = useAppSelector(selectOrder);
    const isOrderLoading = useAppSelector(selectIsOrderLoading);
    const isOrderLoadingFailed = useAppSelector(selectIsOrderLoadingFailed);
    const isCurrentEmployeeLoading = useAppSelector(selectIsCurrentEmployeeLoading);

    const getOrder = useCallback(() => {
        dispatch(getOrderRequest({ orderId: orderId ? Number.parseInt(orderId, 10) : -1 }));
    }, [dispatch, orderId]);

    useEffect(() => {
        getOrder();
    }, [getOrder]);

    if (isOrderLoading || isCurrentEmployeeLoading) {
        return (
            <div className={styles.container}>
                <div className={partsStyles.flexBaseCenterContainer}>
                    <Loader active inline="centered" />
                </div>
            </div>
        );
    }

    if (isOrderLoadingFailed) {
        return <LoadingErrorBlock isLoadingErrorObjectText="информации о заявке" reload={getOrder} />;
    }

    if (order) {
        return (
            <div className={styles.container}>
                <OrderInfo order={order} />
            </div>
        );
    }

    return <ErrorBlock />;
}
