import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import axios from "@api/api";
import apiUrls from "@api/apiUrls";
import { parseParams } from "@coreUtils/utils";
import { Order, OrdersFiltersFormValues, OrdersResponse } from "@models/order/types";

interface OrdersState {
    orders: Order[];
    pageOrders: Order[];
    ordersCurrentPage: number;
    ordersTotalPages?: number;
    isOrdersLoading: boolean;
    isOrdersLoadingFailed: boolean;
}

const initialState: OrdersState = {
    orders: [],
    pageOrders: [],
    ordersCurrentPage: 1,
    ordersTotalPages: undefined,
    isOrdersLoading: true,
    isOrdersLoadingFailed: false
};

export const getOrdersRequest = createAsyncThunk("getOrdersRequest", async (values: OrdersFiltersFormValues) => {
    for (const key in values) {
        if (values[key as keyof OrdersFiltersFormValues] === "") {
            // @ts-ignore
            values[key as keyof OrdersFiltersFormValues] = undefined;
        }
    }

    const response: AxiosResponse<OrdersResponse> = await axios.get<OrdersResponse>(apiUrls.orders(), {
        params: values,
        paramsSerializer: parseParams
    });
    return response.data;
});

export const specialistOrderSlice = createSlice({
    name: "specialistOrder",
    initialState,
    reducers: {
        resetOrdersPageList: (state) => {
            state.pageOrders = state.orders.slice(0, 50);
        },
        onNextOrdersPageList: (state) => {
            if (state.ordersTotalPages && state.ordersCurrentPage < state.ordersTotalPages) {
                state.ordersCurrentPage += 1;
                state.pageOrders = state.orders.slice(0, state.ordersCurrentPage * 50);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getOrdersRequest.pending, (state) => {
            state.isOrdersLoading = true;
            state.isOrdersLoadingFailed = false;
            state.orders = [];
            state.pageOrders = [];
            state.ordersTotalPages = undefined;
            state.ordersCurrentPage = 1;
        });
        builder.addCase(getOrdersRequest.rejected, (state) => {
            state.isOrdersLoading = false;
            state.isOrdersLoadingFailed = true;
        });
        builder.addCase(getOrdersRequest.fulfilled, (state, action) => {
            state.isOrdersLoading = false;
            state.orders = action.payload.list;
            state.ordersTotalPages = Math.ceil(action.payload.total / 50);
            state.pageOrders = state.orders.slice(0, 50);
        });
    }
});

export const { resetOrdersPageList, onNextOrdersPageList } = specialistOrderSlice.actions;

export default specialistOrderSlice.reducer;
