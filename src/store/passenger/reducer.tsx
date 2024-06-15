import { Toast, toast } from "react-hot-toast";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import axios from "@api/api";
import apiUrls from "@api/apiUrls";
import AddOrderSuccessToast from "@components/Order/AddOrderSuccessToast";
import {
    Passenger,
    PassengerFormValue,
    PassengerResponse,
    PassengersResponse,
    PassengerWithLockResponse
} from "@models/passenger/types";

const CREATE_PASSENGER_TOAST = "create-passenger";
const UPDATE_PASSENGER_TOAST = (passengerId: number) => `update-passenger-${passengerId}`;
const PASSENGER_LOCKED_FOR_EDIT_TOAST = (passengerId: number) => `passenger-locked-for-edit-${passengerId}`;

interface PassengerState {
    passengers: Passenger[];
    isPassengersLoading: boolean;
    isPassengersLoadingFailed: boolean;
    passenger?: Passenger;
    isPassengerLoading: boolean;
    isPassengerLoadingFailed: boolean;
    isPassengerUpdating: boolean;
}

const initialState: PassengerState = {
    passengers: [],
    isPassengersLoading: false,
    isPassengersLoadingFailed: false,
    passenger: undefined,
    isPassengerLoading: true,
    isPassengerLoadingFailed: false,
    isPassengerUpdating: false
};

export const getPassengersRequest = createAsyncThunk("getPassengersRequest", async () => {
    const response: AxiosResponse<PassengersResponse> = await axios.get<PassengersResponse>(apiUrls.passengers());
    return response.data;
});

export const getPassengerRequest = createAsyncThunk("getPassengerRequest", async ({ passengerId }: { passengerId: number }) => {
    const response: AxiosResponse<PassengerWithLockResponse> = await axios.get<PassengerWithLockResponse>(
        apiUrls.passengersId(passengerId)
    );
    return response.data;
});

export const createPassengerRequest = createAsyncThunk("createPassengerRequest", async (values: PassengerFormValue) => {
    const response: AxiosResponse<PassengerResponse> = await axios.post<PassengerResponse>(apiUrls.passengers(), values);
    return response.data;
});

export const updatePassengerRequest = createAsyncThunk(
    "updatePassengerRequest",
    async ({ passengerId, ...values }: PassengerFormValue & { passengerId: number }) => {
        const response: AxiosResponse<PassengerResponse> = await axios.put<PassengerResponse>(
            apiUrls.passengersId(passengerId),
            values
        );
        return response.data;
    }
);

export const passengerSlice = createSlice({
    name: "passenger",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPassengersRequest.pending, (state) => {
            state.isPassengersLoading = true;
            state.isPassengersLoadingFailed = false;
            state.passengers = [];
        });
        builder.addCase(getPassengersRequest.rejected, (state) => {
            state.isPassengersLoading = false;
            state.isPassengersLoadingFailed = true;
        });
        builder.addCase(getPassengersRequest.fulfilled, (state, action) => {
            state.isPassengersLoading = false;
            state.passengers = action.payload.list;
        });
        builder.addCase(getPassengerRequest.pending, (state) => {
            state.isPassengerLoading = true;
            state.isPassengerLoadingFailed = false;
            state.passenger = undefined;
        });
        builder.addCase(getPassengerRequest.rejected, (state) => {
            state.isPassengerLoading = false;
            state.isPassengerLoadingFailed = true;
        });
        builder.addCase(getPassengerRequest.fulfilled, (state, action) => {
            state.isPassengersLoading = false;
            state.passenger = action.payload.data;

            if (action.payload.isLockedForEdit) {
                toast.error("Профиль данного пассажира сейчас редактируется другим пользователем", {
                    id: PASSENGER_LOCKED_FOR_EDIT_TOAST(action.payload.data.id),
                    duration: 120_000
                });
            }
        });
        builder.addCase(createPassengerRequest.pending, (state) => {
            state.isPassengerUpdating = true;
            toast.loading("Создаем нового пассажира", { id: CREATE_PASSENGER_TOAST });
        });
        builder.addCase(createPassengerRequest.rejected, (state) => {
            state.isPassengerUpdating = false;
            toast.error("Произошла ошибка при создании пассажира", { id: CREATE_PASSENGER_TOAST });
        });
        builder.addCase(createPassengerRequest.fulfilled, (state, action) => {
            state.isPassengerUpdating = false;
            state.passenger = action.payload;
            toast.custom((t: Toast) => <AddOrderSuccessToast toast={t} createdOrderId={action.payload.id} />, {
                id: CREATE_PASSENGER_TOAST,
                duration: 120_000
            });
        });
        builder.addCase(updatePassengerRequest.pending, (state, action) => {
            state.isPassengerUpdating = true;
            toast.loading("Обновляем пассажира", { id: UPDATE_PASSENGER_TOAST(action.meta.arg.passengerId) });
        });
        builder.addCase(updatePassengerRequest.rejected, (state, action) => {
            state.isPassengerUpdating = false;
            toast.error("Произошла ошибка при обновлении пассажира", { id: UPDATE_PASSENGER_TOAST(action.meta.arg.passengerId) });
        });
        builder.addCase(updatePassengerRequest.fulfilled, (state, action) => {
            state.isPassengerUpdating = false;
            state.passenger = action.payload;
            toast.success("Пассажир успешно обновлен", { id: UPDATE_PASSENGER_TOAST(action.meta.arg.passengerId) });
        });
    }
});

export default passengerSlice.reducer;
