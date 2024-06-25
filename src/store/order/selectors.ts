import { RootState } from "@store/index";

export const selectOrder = (state: RootState) => state.order.order;

export const selectOrderCalculation = (state: RootState) => state.order.orderCalculation;

export const selectIsOrderLoading = (state: RootState) => state.order.isOrderLoading;

export const selectIsOrderLoadingFailed = (state: RootState) => state.order.isOrderLoadingFailed;

export const selectIsOrderCalculating = (state: RootState) => state.order.isOrderCalculating;

export const selectIsOrderUpdating = (state: RootState) => state.order.isOrderUpdating;
