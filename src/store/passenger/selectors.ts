import { RootState } from "@store/index";

export const selectPassengers = (state: RootState) => state.passenger.passengers;

export const selectIsPassengersLoading = (state: RootState) => state.passenger.isPassengersLoading;

export const selectIsPassengersLoadingFailed = (state: RootState) => state.passenger.isPassengersLoadingFailed;

export const selectPassenger = (state: RootState) => state.passenger.passenger;

export const selectIsPassengerLoading = (state: RootState) => state.passenger.isPassengerLoading;

export const selectIsPassengerLoadingFailed = (state: RootState) => state.passenger.isPassengerLoadingFailed;

export const selectIsPassengerUpdating = (state: RootState) => state.passenger.isPassengerUpdating;
