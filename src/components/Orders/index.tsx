import React, { lazy } from "react";

import { Loader } from "semantic-ui-react";

import partsStyles from "@coreStyles/baseParts.module.scss";
import { EmployeeRole } from "@models/employee/enums";
import { selectCurrentEmployeeRole } from "@store/employee/selectors";
import { useAppSelector } from "@store/hooks";

const ExecutorOrders = lazy(/* webpackChunkName: "ExecutorOrders" */ () => import("@components/Orders/ExecutorOrders"));
const OrdersList = lazy(/* webpackChunkName: "OrdersList" */ () => import("@components/Orders/OrdersList"));

export default function Orders() {
    const employeeRole = useAppSelector(selectCurrentEmployeeRole);

    if (!employeeRole) {
        return (
            <div className={partsStyles.flexBaseCenterContainer}>
                <Loader active inline="centered" />
            </div>
        );
    }

    if (employeeRole === EmployeeRole.EXECUTOR) {
        return <ExecutorOrders />;
    }

    return <OrdersList />;
}
