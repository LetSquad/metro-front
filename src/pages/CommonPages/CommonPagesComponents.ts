import { lazy } from "react";

import { PageComponents } from "@models/pages/types";

const Orders = lazy(/* webpackChunkName: "Orders" */ () => import("@components/Orders"));
const Order = lazy(/* webpackChunkName: "Order" */ () => import("@components/Order"));

export const CommonPagesComponents: PageComponents = {
    ORDERS: {
        component: Orders
    },
    ORDER: {
        component: Order
    }
};
