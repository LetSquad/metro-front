import React, { useCallback } from "react";
import { Link } from "react-router-dom";

import { PageSlugs } from "@models/pages/enums";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { ordersDistributionRequest } from "@store/ordersDistribution/reducer";
import { selectIsOrdersDistributionLoading } from "@store/ordersDistribution/selectors";

import styles from "./styles/OrdersDistributionHeader.module.scss";

export default function OrdersDistributionHeader() {
    const dispatch = useAppDispatch();

    const isOrdersDistributionLoading = useAppSelector(selectIsOrdersDistributionLoading);

    const ordersDistribution = useCallback(() => {
        dispatch(ordersDistributionRequest());
    }, [dispatch]);

    return (
        <div className={styles.container}>
            <Link to={PageSlugs.PASSENGER_REGISTER}>
                <PrimaryButton>Создать пользователя</PrimaryButton>
            </Link>
            <Link to={PageSlugs.ORDER_NEW}>
                <PrimaryButton>Создать заявку</PrimaryButton>
            </Link>
            <PrimaryButton disabled={isOrdersDistributionLoading} loading={isOrdersDistributionLoading} onClick={ordersDistribution}>
                Распределить заявки
            </PrimaryButton>
        </div>
    );
}
