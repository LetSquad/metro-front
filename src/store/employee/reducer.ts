import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import axios from "@api/api";
import apiUrls from "@api/apiUrls";
import { Employee, EmployeeCurrentResponse } from "@models/employee/types";

interface EmployeeState {
    currentEmployee?: Employee;
    isCurrentEmployeeLoading: boolean;
    isCurrentEmployeeLoadingFailed: boolean;
    isUpdatingCurrentEmployee: boolean;
}

const initialState: EmployeeState = {
    currentEmployee: undefined,
    isCurrentEmployeeLoading: true,
    isCurrentEmployeeLoadingFailed: false,
    isUpdatingCurrentEmployee: false
};

export const getCurrentEmployeeRequest = createAsyncThunk("getCurrentEmployeeRequest", async () => {
    const response: AxiosResponse<EmployeeCurrentResponse> = await axios.get<EmployeeCurrentResponse>(apiUrls.employeesProfile());
    return response.data;
});

export const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        resetCurrentEmployee: (state) => {
            state.currentEmployee = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentEmployeeRequest.pending, (state) => {
            state.isCurrentEmployeeLoading = true;
            state.isCurrentEmployeeLoadingFailed = false;
            state.currentEmployee = undefined;
        });
        builder.addCase(getCurrentEmployeeRequest.rejected, (state) => {
            state.isCurrentEmployeeLoading = false;
            state.isCurrentEmployeeLoadingFailed = true;
        });
        builder.addCase(getCurrentEmployeeRequest.fulfilled, (state, action) => {
            state.isCurrentEmployeeLoading = false;
            state.currentEmployee = action.payload;
        });
    }
});

export default employeeSlice.reducer;

export const { resetCurrentEmployee } = employeeSlice.actions;
