import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Loader } from "semantic-ui-react";

import PassengerInfo from "@components/Passenger/PassengerInfo";
import partsStyles from "@coreStyles/baseParts.module.scss";
import ErrorBlock from "@parts/ErrorBlock/ErrorBlock";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { selectIsCurrentEmployeeLoading } from "@store/employee/selectors";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { getPassengerRequest } from "@store/passenger/reducer";
import { selectIsPassengerLoading, selectIsPassengerLoadingFailed, selectPassenger } from "@store/passenger/selectors";

import styles from "./styles/Passenger.module.scss";

export default function Passenger() {
    const dispatch = useAppDispatch();

    const { passengerId } = useParams();

    const passenger = useAppSelector(selectPassenger);
    const isPassengerLoading = useAppSelector(selectIsPassengerLoading);
    const isPassengerLoadingFailed = useAppSelector(selectIsPassengerLoadingFailed);
    const isCurrentEmployeeLoading = useAppSelector(selectIsCurrentEmployeeLoading);

    const getPassenger = useCallback(() => {
        dispatch(getPassengerRequest({ passengerId: passengerId ? Number.parseInt(passengerId, 10) : -1 }));
    }, [dispatch, passengerId]);

    useEffect(() => {
        getPassenger();
    }, [getPassenger]);

    if (isPassengerLoading || isCurrentEmployeeLoading) {
        return (
            <div className={styles.container}>
                <div className={partsStyles.flexBaseCenterContainer}>
                    <Loader active inline="centered" />
                </div>
            </div>
        );
    }

    if (isPassengerLoadingFailed) {
        return <LoadingErrorBlock isLoadingErrorObjectText="информации о пассажире" reload={getPassenger} />;
    }

    if (passenger) {
        return (
            <div className={styles.container}>
                <PassengerInfo passenger={passenger} />
            </div>
        );
    }

    return <ErrorBlock />;
}
