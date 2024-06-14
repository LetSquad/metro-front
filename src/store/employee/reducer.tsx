import { Toast, toast } from "react-hot-toast";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

import axios from "@api/api";
import apiUrls from "@api/apiUrls";
import AddEmployeeSuccessToast from "@components/Employee/AddEmployeeSuccessToast";
import {
    Employee,
    EmployeeCurrent,
    EmployeeCurrentResponse,
    EmployeeFormFields,
    EmployeeResponse,
    EmployeesResponse,
    EmployeeWithLockResponse
} from "@models/employee/types";

const CREATE_EMPLOYEE_TOAST = "create-employee";
const UPDATE_EMPLOYEE_TOAST = (employeeId: number) => `update-employee-${employeeId}`;
const EMPLOYEE_LOCKED_FOR_EDIT_TOAST = (employeeId: number) => `employee-locked-for-edit-${employeeId}`;

interface EmployeeState {
    currentEmployee?: EmployeeCurrent;
    isCurrentEmployeeLoading: boolean;
    isCurrentEmployeeLoadingFailed: boolean;
    employees: Employee[];
    isEmployeesLoading: boolean;
    isEmployeesLoadingFailed: boolean;
    employee?: Employee;
    isEmployeeLoading: boolean;
    isEmployeeLoadingFailed: boolean;
    isEmployeeUpdating: boolean;
}

const initialState: EmployeeState = {
    currentEmployee: undefined,
    isCurrentEmployeeLoading: true,
    isCurrentEmployeeLoadingFailed: false,
    employees: [],
    isEmployeesLoading: false,
    isEmployeesLoadingFailed: false,
    employee: undefined,
    isEmployeeLoading: true,
    isEmployeeLoadingFailed: false,
    isEmployeeUpdating: false
};

export const getCurrentEmployeeRequest = createAsyncThunk("getCurrentEmployeeRequest", async () => {
    const response: AxiosResponse<EmployeeCurrentResponse> = await axios.get<EmployeeCurrentResponse>(apiUrls.employeesProfile());
    return response.data;
});

export const getEmployeesRequest = createAsyncThunk("getEmployeesRequest", async () => {
    const response: AxiosResponse<EmployeesResponse> = await axios.get<EmployeesResponse>(apiUrls.employees());
    return response.data;
});

export const getEmployeeRequest = createAsyncThunk("getEmployeeRequest", async ({ employeeId }: { employeeId: number }) => {
    const response: AxiosResponse<EmployeeWithLockResponse> = await axios.get<EmployeeWithLockResponse>(
        apiUrls.employeesId(employeeId)
    );
    return response.data;
});

export const createEmployeeRequest = createAsyncThunk("createEmployeeRequest", async (values: EmployeeFormFields) => {
    const response: AxiosResponse<EmployeeResponse> = await axios.post<EmployeeResponse>(apiUrls.employees(), values);
    return response.data;
});

export const updateEmployeeRequest = createAsyncThunk(
    "updateEmployeeRequest",
    async ({ employeeId, ...values }: EmployeeFormFields & { employeeId: number }) => {
        const response: AxiosResponse<EmployeeResponse> = await axios.put<EmployeeResponse>(apiUrls.employeesId(employeeId), values);
        return response.data;
    }
);

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
        builder.addCase(getEmployeesRequest.pending, (state) => {
            state.isEmployeesLoading = true;
            state.isEmployeesLoadingFailed = false;
            state.employees = [];
        });
        builder.addCase(getEmployeesRequest.rejected, (state) => {
            state.isEmployeesLoading = false;
            state.isEmployeesLoadingFailed = true;
        });
        builder.addCase(getEmployeesRequest.fulfilled, (state, action) => {
            state.isEmployeesLoading = false;
            state.employees = action.payload.list;
        });
        builder.addCase(getEmployeeRequest.pending, (state) => {
            state.isEmployeeLoading = true;
            state.isEmployeeLoadingFailed = false;
            state.employee = undefined;
        });
        builder.addCase(getEmployeeRequest.rejected, (state) => {
            state.isEmployeeLoading = false;
            state.isEmployeeLoadingFailed = true;
        });
        builder.addCase(getEmployeeRequest.fulfilled, (state, action) => {
            state.isEmployeesLoading = false;
            state.employee = action.payload.data;

            if (action.payload.isLockedForEdit) {
                toast.error("Профиль данного сотрудника сейчас редактируется другим пользователем", {
                    id: EMPLOYEE_LOCKED_FOR_EDIT_TOAST(action.payload.data.id),
                    duration: 120_000
                });
            }
        });
        builder.addCase(createEmployeeRequest.pending, (state) => {
            state.isEmployeeUpdating = true;
            toast.loading("Создаем нового сотрудника", { id: CREATE_EMPLOYEE_TOAST });
        });
        builder.addCase(createEmployeeRequest.rejected, (state) => {
            state.isEmployeeUpdating = false;
            toast.error("Произошла ошибка при создании сотрудника", { id: CREATE_EMPLOYEE_TOAST });
        });
        builder.addCase(createEmployeeRequest.fulfilled, (state, action) => {
            state.isEmployeeUpdating = false;
            state.employee = action.payload;
            toast.custom((t: Toast) => <AddEmployeeSuccessToast toast={t} createdEmployeeId={action.payload.id} />, {
                id: CREATE_EMPLOYEE_TOAST,
                duration: 120_000
            });
        });
        builder.addCase(updateEmployeeRequest.pending, (state, action) => {
            state.isEmployeeUpdating = true;
            toast.loading("Обновляем сотрудника", { id: UPDATE_EMPLOYEE_TOAST(action.meta.arg.employeeId) });
        });
        builder.addCase(updateEmployeeRequest.rejected, (state, action) => {
            state.isEmployeeUpdating = false;
            toast.error("Произошла ошибка при обновлении сотрудника", { id: UPDATE_EMPLOYEE_TOAST(action.meta.arg.employeeId) });
        });
        builder.addCase(updateEmployeeRequest.fulfilled, (state, action) => {
            state.isEmployeeUpdating = false;
            state.employee = action.payload;
            toast.success("Сотрудник успешно обновлен", { id: UPDATE_EMPLOYEE_TOAST(action.meta.arg.employeeId) });
        });
    }
});

export default employeeSlice.reducer;

export const { resetCurrentEmployee } = employeeSlice.actions;
