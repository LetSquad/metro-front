import { lazy } from "react";

import { PageComponents } from "@models/pages/types";

const Passengers = lazy(/* webpackChunkName: "Passengers" */ () => import("@components/Passengers"));
const Passenger = lazy(/* webpackChunkName: "Passenger" */ () => import("@components/Passenger"));
const AddPassenger = lazy(/* webpackChunkName: "AddPassenger" */ () => import("@components/AddPassenger"));
const Employees = lazy(/* webpackChunkName: "Employees" */ () => import("@components/Employees"));
const Employee = lazy(/* webpackChunkName: "Employee" */ () => import("@components/Employee"));
const AddOrder = lazy(/* webpackChunkName: "AddOrder" */ () => import("@components/AddOrder"));
const OrdersDistribution = lazy(/* webpackChunkName: "OrdersDistribution" */ () => import("@components/OrdersDistribution"));

export const AdvancedPagesComponents: PageComponents = {
    PASSENGERS: {
        component: Passengers
    },
    PASSENGER: {
        component: Passenger
    },
    PASSENGER_REGISTER: {
        component: AddPassenger
    },
    EMPLOYEES: {
        component: Employees
    },
    EMPLOYEE: {
        component: Employee
    },
    ORDER_NEW: {
        component: AddOrder
    },
    ORDERS_DISTRIBUTION: {
        component: OrdersDistribution
    }
};
