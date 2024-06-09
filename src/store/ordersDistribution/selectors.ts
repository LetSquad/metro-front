import { RootState } from "@store/index";

export const selectOrdersTimesList = (state: RootState) => state.ordersDistribution.ordersTimeList;

export const selectIsOrdersTimesListLoading = (state: RootState) => state.ordersDistribution.isOrdersTimeListLoading;

export const selectIsOrdersTimesListLoadingFailed = (state: RootState) => state.ordersDistribution.isOrdersTimeListLoadingFailed;

export const selectIsOrdersDistributionLoading = (state: RootState) => state.ordersDistribution.isOrdersDistributionLoading;
