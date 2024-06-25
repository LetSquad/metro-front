import { RootState } from "@store/index";

export const selectOrders = (state: RootState) => state.specialistOrders.pageOrders;

export const selectOrdersCurrentPage = (state: RootState) => state.specialistOrders.ordersCurrentPage;

export const selectOrdersTotalPages = (state: RootState) => state.specialistOrders.ordersTotalPages;

export const selectIsOrdersLoading = (state: RootState) => state.specialistOrders.isOrdersLoading;

export const selectIsOrdersLoadingFailed = (state: RootState) => state.specialistOrders.isOrdersLoadingFailed;
