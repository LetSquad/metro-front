import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Toast, toast } from "react-hot-toast";

import { FormikProvider, useFormik } from "formik";
import { Loader } from "semantic-ui-react";

import PassengerCard from "@components/Passengers/PassengerCard";
import PassengersListFilter from "@components/Passengers/PassengersListFilter";
import PassengersListHeader from "@components/Passengers/PassengersListHeader";
import partsStyles from "@coreStyles/baseParts.module.scss";
import useWebsocket from "@hooks/useWebsocket";
import { PassengersFiltersFieldsName } from "@models/passenger/enums";
import { PassengersFiltersFormValues } from "@models/passenger/types";
import { WebSocketDataTypeEnum, WebSocketResponseActionEnum } from "@models/websocket/enums";
import { UpdateListWebSocketRequestData, WebSocketResponse } from "@models/websocket/types";
import ListChangedToast from "@parts/ListChangedToast";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { selectCurrentEmployee } from "@store/employee/selectors";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getPassengersRequest } from "@store/passenger/reducer";
import { selectIsPassengersLoading, selectIsPassengersLoadingFailed, selectPassengers } from "@store/passenger/selectors";

import { validationSchema } from "./PassengersListFilter/validation";
import styles from "./styles/PassengersList.module.scss";

export const initialValues: PassengersFiltersFormValues = {
    [PassengersFiltersFieldsName.FIRST_NAME]: undefined,
    [PassengersFiltersFieldsName.LAST_NAME]: undefined,
    [PassengersFiltersFieldsName.PHONE]: undefined,
    [PassengersFiltersFieldsName.CATEGORIES]: undefined
};

export default function PassengersList() {
    const dispatch = useAppDispatch();

    const currentEmployee = useAppSelector(selectCurrentEmployee);
    const passengers = useAppSelector(selectPassengers);
    const isPassengersLoading = useAppSelector(selectIsPassengersLoading);
    const isPassengersLoadingFailed = useAppSelector(selectIsPassengersLoadingFailed);

    const [filterValues, setFilterValues] = useState(initialValues);

    const getPassengers = useCallback(
        (values?: PassengersFiltersFormValues) => {
            dispatch(getPassengersRequest(values ?? filterValues));
        },
        [dispatch, filterValues]
    );

    const onWebSocketMessage = useCallback(
        (eventData: WebSocketResponse) => {
            if (eventData.action === WebSocketResponseActionEnum.UPDATE && !isPassengersLoading) {
                toast.custom((t: Toast) => <ListChangedToast onClick={getPassengers} toast={t} />, {
                    id: "update-orders-list-toast",
                    duration: 120_000
                });
            }
        },
        [getPassengers, isPassengersLoading]
    );

    const { startSocket } = useWebsocket<UpdateListWebSocketRequestData>(
        { type: WebSocketDataTypeEnum.PASSENGER_LIST_UPDATE, login: currentEmployee?.login as string },
        onWebSocketMessage
    );

    const onFiltersSubmit = useCallback(
        (values: PassengersFiltersFormValues) => {
            setFilterValues(values);
            getPassengers(values);
        },
        [getPassengers]
    );

    const passengersList = useMemo(() => {
        if (isPassengersLoading) {
            return (
                <div className={partsStyles.flexBaseCenterContainer}>
                    <Loader active inline="centered" />
                </div>
            );
        }

        if (isPassengersLoadingFailed) {
            return <LoadingErrorBlock isLoadingErrorObjectText="информации о пассажирах" reload={getPassengers} />;
        }

        if (!passengers || passengers.length === 0) {
            return <div className={partsStyles.flexBaseCenterContainer}>По заданным критериям пассажиры не найдены</div>;
        }

        return (
            <div className={styles.contentContainer}>
                <PassengersListHeader />
                <div className={styles.ordersContainer}>
                    {passengers.map((passenger) => (
                        <PassengerCard key={passenger.id} passenger={passenger} />
                    ))}
                </div>
            </div>
        );
    }, [getPassengers, isPassengersLoading, isPassengersLoadingFailed, passengers]);

    const formik = useFormik<PassengersFiltersFormValues>({
        onSubmit: onFiltersSubmit,
        initialValues,
        validationSchema,
        validateOnMount: true
    });

    const onFiltersReset = useCallback(() => {
        formik.resetForm();
        setFilterValues(initialValues);
        getPassengers(initialValues);
    }, [formik, getPassengers]);

    useEffect(() => {
        getPassengers(initialValues);
        startSocket();

        return () => {
            toast.dismiss("update-orders-list-toast");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <FormikProvider value={formik}>
            <div className={styles.container}>
                {passengersList}
                <div className={styles.filters}>
                    <PassengersListFilter isLoading={isPassengersLoading} onFiltersReset={onFiltersReset} />
                </div>
            </div>
        </FormikProvider>
    );
}
