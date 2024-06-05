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

export const selectIsUpdatingCurrentEmployee = (state: RootState) => state.employee.isUpdatingCurrentEmployee;
