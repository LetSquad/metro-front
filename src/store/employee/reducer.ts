import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import apiUrls from "@api/apiUrls";
import { Employee, EmployeeResponse } from "@models/employee/types";

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

export const getEmployeeRequest = createAsyncThunk("getEmployeeRequest", async () => {
    const response: AxiosResponse<EmployeeResponse> = await axios.get<EmployeeResponse>(apiUrls.employeesProfile());
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
        builder.addCase(getEmployeeRequest.pending, (state) => {
            state.isCurrentEmployeeLoading = true;
            state.isCurrentEmployeeLoadingFailed = false;
            state.currentEmployee = undefined;
        });
        builder.addCase(getEmployeeRequest.rejected, (state) => {
            state.isCurrentEmployeeLoading = false;
            state.isCurrentEmployeeLoadingFailed = true;
        });
        builder.addCase(getEmployeeRequest.fulfilled, (state, action) => {
            state.isCurrentEmployeeLoading = false;
            state.currentEmployee = action.payload;
        });
    }
});

export default employeeSlice.reducer;

export const { resetCurrentEmployee } = employeeSlice.actions;
