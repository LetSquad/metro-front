import { configureStore } from "@reduxjs/toolkit";
import promise from "redux-promise-middleware";
import { thunk } from "redux-thunk";

import employeeReducer from "./employee/reducer";
import infoReducer from "./info/reducer";
import orderReducer from "./order/reducer";
import ordersDistributionReducer from "./ordersDistribution/reducer";
import passengerReducer from "./passenger/reducer";

export const store = configureStore({
    reducer: {
        info: infoReducer,
        employee: employeeReducer,
        passenger: passengerReducer,
        ordersDistribution: ordersDistributionReducer,
        order: orderReducer
    },
    devTools: process.env.NODE_ENV !== "production",
    // eslint-disable-next-line unicorn/prefer-spread
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([promise, thunk])
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
