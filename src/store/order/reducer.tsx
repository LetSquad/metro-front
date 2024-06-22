import { Toast, toast } from "react-hot-toast";

import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import axios from "@api/api";
import apiUrls from "@api/apiUrls";
import AddOrderSuccessToast from "@components/Order/AddOrderSuccessToast";
import {
    Order,
    OrderCalculation,
    OrderCalculationFormValues,
    OrderCalculationResponse,
    OrderFormValues,
    OrderResponse,
    OrderWithLockResponse
} from "@models/order/types";

const CALCULATE_ORDER_TOAST = (orderId?: number) => `calculate-order-${orderId ?? "new"}`;
const CREATE_ORDER_TOAST = "create-order";
const UPDATE_ORDER_TOAST = (orderId: number) => `update-order-${orderId}`;
const ORDER_LOCKED_FOR_EDIT_TOAST = (orderId: number) => `order-locked-for-edit-${orderId}`;

interface OrderState {
    order?: Order;
    orderCalculation?: OrderCalculation;
    isOrderLoading: boolean;
    isOrderCalculating: boolean;
    isOrderUpdating: boolean;
    isOrdersLoadingFailed: boolean;
}

const initialState: OrderState = {
    order: undefined,
    orderCalculation: undefined,
    isOrderLoading: true,
    isOrderCalculating: false,
    isOrderUpdating: false,
    isOrdersLoadingFailed: false
};

export const getOrderRequest = createAsyncThunk("getOrderRequest", async ({ orderId }: { orderId: number }) => {
    const response: AxiosResponse<OrderWithLockResponse> = await axios.get<OrderWithLockResponse>(apiUrls.ordersId(orderId));
    return response.data;
});

export const calculateOrderRequest = createAsyncThunk(
    "calculateOrderRequest",
    async (values: OrderCalculationFormValues & { orderId?: number }) => {
        const response: AxiosResponse<OrderCalculationResponse> = await axios.post<OrderCalculationResponse>(
            apiUrls.ordersCalculation(),
            values
        );
        return response.data;
    }
);

export const createOrderRequest = createAsyncThunk("createOrderRequest", async (values: OrderFormValues) => {
    const response: AxiosResponse<OrderResponse> = await axios.post<OrderResponse>(apiUrls.orders(), values);
    return response.data;
});

export const updateOrderRequest = createAsyncThunk(
    "updateOrderRequest",
    async ({ orderId, ...values }: OrderFormValues & { orderId: number }) => {
        const response: AxiosResponse<OrderResponse> = await axios.put<OrderResponse>(apiUrls.ordersId(orderId), values);
        return response.data;
    }
);

export const updateOrderStatusRequest = createAsyncThunk(
    "updateOrderStatusRequest",
    async ({ orderId, status }: { orderId: number; status: string }) => {
        const response: AxiosResponse<OrderResponse> = await axios.put<OrderResponse>(apiUrls.ordersIdStatus(orderId), { status });
        return response.data;
    }
);

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        resetOrderCalculation: (state) => {
            state.orderCalculation = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getOrderRequest.pending, (state) => {
            state.isOrderLoading = true;
            state.isOrdersLoadingFailed = false;
            state.order = undefined;
        });
        builder.addCase(getOrderRequest.rejected, (state) => {
            state.isOrderLoading = false;
            state.isOrdersLoadingFailed = true;
        });
        builder.addCase(getOrderRequest.fulfilled, (state, action) => {
            state.isOrderLoading = false;
            state.order = action.payload.data;

            if (action.payload.isLockedForEdit) {
                toast.error("Данная заявка сейчас редактируется другим пользователем", {
                    id: ORDER_LOCKED_FOR_EDIT_TOAST(action.payload.data.id),
                    duration: 120_000
                });
            }
        });
        builder.addCase(calculateOrderRequest.pending, (state, action) => {
            state.isOrderCalculating = true;
            state.orderCalculation = undefined;

            toast.loading("Расчитываем маршрут для заявки", {
                id: CALCULATE_ORDER_TOAST(action.meta.arg.orderId)
            });
        });
        builder.addCase(calculateOrderRequest.rejected, (state, action) => {
            state.isOrderCalculating = false;

            toast.error("Произошла ошибка при расчете маршрута для заявки. Повторите попытку позже", {
                id: CALCULATE_ORDER_TOAST(action.meta.arg.orderId)
            });
        });
        builder.addCase(calculateOrderRequest.fulfilled, (state, action) => {
            state.isOrderLoading = false;
            state.orderCalculation = action.payload;

            toast.dismiss(CALCULATE_ORDER_TOAST(action.meta.arg.orderId));
        });
        builder.addCase(createOrderRequest.pending, (state) => {
            state.isOrderUpdating = true;
            toast.loading("Создаем новую заявку", { id: CREATE_ORDER_TOAST });
        });
        builder.addCase(createOrderRequest.rejected, (state) => {
            state.isOrderUpdating = false;
            toast.error("Произошла ошибка при создании заявки", { id: CREATE_ORDER_TOAST });
        });
        builder.addCase(createOrderRequest.fulfilled, (state, action) => {
            state.isOrderUpdating = false;
            toast.custom((t: Toast) => <AddOrderSuccessToast toast={t} createdOrderId={action.payload.id} />, {
                id: CREATE_ORDER_TOAST,
                duration: 120_000
            });
        });
        builder.addMatcher(isAnyOf(updateOrderRequest.pending, updateOrderStatusRequest.pending), (state, action) => {
            state.isOrderUpdating = true;
            toast.loading("Обновляем заявку", { id: UPDATE_ORDER_TOAST(action.meta.arg.orderId) });
        });
        builder.addMatcher(isAnyOf(updateOrderRequest.rejected, updateOrderStatusRequest.rejected), (state, action) => {
            state.isOrderUpdating = false;
            toast.error("Произошла ошибка при обновлении заявки", { id: UPDATE_ORDER_TOAST(action.meta.arg.orderId) });
        });
        builder.addMatcher(isAnyOf(updateOrderRequest.fulfilled, updateOrderStatusRequest.fulfilled), (state, action) => {
            state.isOrderUpdating = false;
            state.order = action.payload;
            toast.success("Заявка успешно обновлена", { id: UPDATE_ORDER_TOAST(action.meta.arg.orderId) });
        });
    }
});

export const { resetOrderCalculation } = orderSlice.actions;

export default orderSlice.reducer;
