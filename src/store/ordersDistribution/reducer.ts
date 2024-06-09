import { toast } from "react-hot-toast";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import axios from "@api/api";
import apiUrls from "@api/apiUrls";
import { OrdersTimeList, OrdersTimeListResponse } from "@models/order/types";

const ORDER_DISTRIBUTION_TOAST_NAME = "orders-distribution";

interface OrdersDistributionState {
    ordersTimeList: OrdersTimeList[];
    isOrdersTimeListLoading: boolean;
    isOrdersTimeListLoadingFailed: boolean;
    isOrdersDistributionLoading: boolean;
}

const initialState: OrdersDistributionState = {
    ordersTimeList: [],
    isOrdersTimeListLoading: true,
    isOrdersTimeListLoadingFailed: false,
    isOrdersDistributionLoading: false
};

export const getOrdersTimeListRequest = createAsyncThunk("getOrdersTimeListRequest", async () => {
    const response: AxiosResponse<OrdersTimeListResponse> = await axios.get<OrdersTimeListResponse>(apiUrls.ordersTimeList());
    return response.data;
});

export const ordersDistributionRequest = createAsyncThunk("ordersDistributionRequest", async () => {
    const response: AxiosResponse<OrdersTimeListResponse> = await axios.post<OrdersTimeListResponse>(apiUrls.ordersDistribution());
    return response.data;
});

export const ordersDistributionSlice = createSlice({
    name: "ordersDistribution",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrdersTimeListRequest.rejected, (state) => {
            state.isOrdersTimeListLoading = false;
            state.isOrdersTimeListLoadingFailed = true;
        });
        builder.addCase(ordersDistributionRequest.rejected, (state) => {
            state.isOrdersDistributionLoading = false;
            toast.error("Произошла ошибка при распределении заявок", { id: ORDER_DISTRIBUTION_TOAST_NAME });
        });
        builder.addCase(getOrdersTimeListRequest.pending, (state) => {
            state.isOrdersTimeListLoading = true;
            state.isOrdersTimeListLoadingFailed = false;
            state.ordersTimeList = [];
        });
        builder.addCase(ordersDistributionRequest.pending, (state) => {
            state.isOrdersDistributionLoading = true;
            state.isOrdersTimeListLoadingFailed = false;
            toast.loading("Распределяем заявки", { id: ORDER_DISTRIBUTION_TOAST_NAME });
        });
        builder.addCase(getOrdersTimeListRequest.fulfilled, (state, action) => {
            state.isOrdersTimeListLoading = false;
            state.ordersTimeList = action.payload.ordersTimeList;
        });
        builder.addCase(ordersDistributionRequest.fulfilled, (state, action) => {
            state.isOrdersDistributionLoading = false;
            state.ordersTimeList = action.payload.ordersTimeList;
            toast.success("Заявки успешно распределены", { id: ORDER_DISTRIBUTION_TOAST_NAME });
        });
    }
});

export default ordersDistributionSlice.reducer;
