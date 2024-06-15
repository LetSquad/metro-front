import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@store/index";

export const selectIsEmployeeAuth = (state: RootState) => state.info.auth;

export const selectEmployeeRole = (state: RootState) => state.info.role;

export const selectIsEmployeeNotAuth = createSelector([selectIsEmployeeAuth, selectEmployeeRole], (auth, role) => !auth || !role);

export const selectIsLoginOpen = (state: RootState) => state.info.isLoginOpen;
