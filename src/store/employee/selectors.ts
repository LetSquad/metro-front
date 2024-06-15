import { createSelector } from "@reduxjs/toolkit";

import { Employee } from "@models/employee/types";
import { RootState } from "@store/index";

export const selectCurrentEmployee = (state: RootState) => state.employee.currentEmployee;

export const selectCurrentEmployeeRole = createSelector(
    [selectCurrentEmployee],
    (currentEmployee?: Employee) => currentEmployee?.employeeRole
);

export const selectIsCurrentEmployeeLoading = (state: RootState) => state.employee.isCurrentEmployeeLoading;

export const selectIsCurrentEmployeeLoadingFailed = (state: RootState) => state.employee.isCurrentEmployeeLoadingFailed;

export const selectEmployees = (state: RootState) => state.employee.employees;

export const selectIsEmployeesLoading = (state: RootState) => state.employee.isEmployeesLoading;

export const selectIsEmployeesLoadingFailed = (state: RootState) => state.employee.isEmployeesLoadingFailed;

export const selectEmployee = (state: RootState) => state.employee.employee;

export const selectIsEmployeeLoading = (state: RootState) => state.employee.isEmployeeLoading;

export const selectIsEmployeeLoadingFailed = (state: RootState) => state.employee.isEmployeeLoadingFailed;

export const selectIsEmployeeUpdating = (state: RootState) => state.employee.isEmployeeUpdating;
