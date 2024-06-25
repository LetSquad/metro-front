import React, { useCallback, useRef } from "react";

import OrderCard from "@components/Orders/OrderCard";
import { Order } from "@models/order/types";

import styles from "./styles/OrdersListContent.module.scss";

interface OrdersListContentProps {
    orders: Order[];
    isOrdersLoading: boolean;
    ordersTotalPages: number;
    currentPageNumber: number;
    onNextPage: () => void;
}

export default function OrdersListContent({
    orders,
    isOrdersLoading,
    ordersTotalPages,
    currentPageNumber,
    onNextPage
}: OrdersListContentProps) {
    const observer = useRef<IntersectionObserver>(null);

    const lastOrderElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (isOrdersLoading) {
                return;
            }
            if (observer.current) {
                observer.current.disconnect();
            }
            // @ts-ignore
            observer.current = new IntersectionObserver((entries) => {
                const target = entries[0];
                if (target.isIntersecting && ordersTotalPages && currentPageNumber < ordersTotalPages) {
                    onNextPage();
                }
            });
            if (node) {
                observer.current.observe(node);
            }
        },
        [isOrdersLoading, ordersTotalPages, currentPageNumber, onNextPage]
    );

    return (
        <div className={styles.ordersContainer}>
            {orders.map((order, index) => {
                let refElement;
                if (index === orders.length - 1) {
                    refElement = <div ref={lastOrderElementRef} />;
                }

                return (
                    <OrderCard key={order.id} order={order}>
                        {refElement}
                    </OrderCard>
                );
            })}
        </div>
    );
}
