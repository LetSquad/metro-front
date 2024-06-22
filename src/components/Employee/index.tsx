import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Loader } from "semantic-ui-react";

import partsStyles from "@coreStyles/baseParts.module.scss";
import ErrorBlock from "@parts/ErrorBlock/ErrorBlock";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { getEmployeeRequest } from "@store/employee/reducer";
import {
    selectEmployee,
    selectIsCurrentEmployeeLoading,
    selectIsEmployeeLoading,
    selectIsEmployeeLoadingFailed
} from "@store/employee/selectors";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import EmployeeInfo from "./EmployeeInfo";
import styles from "./styles/Employee.module.scss";

export default function Employee() {
    const dispatch = useAppDispatch();

    const { employeeId } = useParams();

    const employee = useAppSelector(selectEmployee);
    const isEmployeeLoading = useAppSelector(selectIsEmployeeLoading);
    const isEmployeeLoadingFailed = useAppSelector(selectIsEmployeeLoadingFailed);
    const isCurrentEmployeeLoading = useAppSelector(selectIsCurrentEmployeeLoading);

    const getEmployee = useCallback(() => {
        dispatch(getEmployeeRequest({ employeeId: employeeId ? Number.parseInt(employeeId, 10) : -1 }));
    }, [dispatch, employeeId]);

    useEffect(() => {
        getEmployee();
    }, [getEmployee]);

    if (isEmployeeLoading || isCurrentEmployeeLoading) {
        return (
            <div className={styles.container}>
                <div className={partsStyles.flexBaseCenterContainer}>
                    <Loader active inline="centered" />
                </div>
            </div>
        );
    }

    if (isEmployeeLoadingFailed) {
        return <LoadingErrorBlock isLoadingErrorObjectText="информации о сотруднике" reload={getEmployee} />;
    }

    if (employee) {
        return (
            <div className={styles.container}>
                <EmployeeInfo employee={employee} />
            </div>
        );
    }

    return <ErrorBlock />;
}
