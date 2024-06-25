import { useCallback, useEffect, useMemo, useState } from "react";

import { FormikProvider, useFormik } from "formik";
import { Loader } from "semantic-ui-react";

import EmployeeCard from "@components/Employees/EmployeeCard";
import EmployeesListFilter from "@components/Employees/EmployeesListFilter";
import { validationSchema } from "@components/Employees/EmployeesListFilter/validation";
import EmployeesListHeader from "@components/Employees/EmployeesListHeader";
import partsStyles from "@coreStyles/baseParts.module.scss";
import { EmployeeRole, EmployeesFiltersFieldsName } from "@models/employee/enums";
import { EmployeesFiltersFormValues } from "@models/employee/types";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { getEmployeesRequest } from "@store/employee/reducer";
import {
    selectCurrentEmployeeRole,
    selectEmployees,
    selectIsEmployeesLoading,
    selectIsEmployeesLoadingFailed
} from "@store/employee/selectors";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import styles from "./styles/EmployeesList.module.scss";

export const initialValues: EmployeesFiltersFormValues = {
    [EmployeesFiltersFieldsName.FIRST_NAME]: undefined,
    [EmployeesFiltersFieldsName.LAST_NAME]: undefined,
    [EmployeesFiltersFieldsName.PHONE]: undefined,
    [EmployeesFiltersFieldsName.LIGHT_DUTIES]: undefined
};

export default function EmployeesList() {
    const dispatch = useAppDispatch();

    const employees = useAppSelector(selectEmployees);
    const isEmployeesLoading = useAppSelector(selectIsEmployeesLoading);
    const isEmployeesLoadingFailed = useAppSelector(selectIsEmployeesLoadingFailed);
    const currentEmployeeRole = useAppSelector(selectCurrentEmployeeRole);

    const isUserAdminOrSpecialist = currentEmployeeRole === EmployeeRole.ADMIN || currentEmployeeRole === EmployeeRole.SPECIALIST;

    const [filterValues, setFilterValues] = useState(initialValues);

    const getEmployees = useCallback(
        (values?: EmployeesFiltersFormValues) => {
            dispatch(getEmployeesRequest(values ?? filterValues));
        },
        [dispatch, filterValues]
    );

    const onFiltersSubmit = useCallback(
        (values: EmployeesFiltersFormValues) => {
            setFilterValues(values);
            getEmployees(values);
        },
        [getEmployees]
    );

    const employeesList = useMemo(() => {
        if (isEmployeesLoading) {
            return (
                <div className={partsStyles.flexBaseCenterContainer}>
                    <Loader active inline="centered" />
                </div>
            );
        }

        if (isEmployeesLoadingFailed) {
            return <LoadingErrorBlock isLoadingErrorObjectText="информации о сотрудниках" reload={getEmployees} />;
        }

        if (!employees || employees.length === 0) {
            return <div className={partsStyles.flexBaseCenterContainer}>По заданным критериям сотрудники не найдены</div>;
        }

        return (
            <div className={styles.contentContainer}>
                {isUserAdminOrSpecialist && <EmployeesListHeader />}
                <div className={styles.ordersContainer}>
                    {employees.map((employee) => (
                        <EmployeeCard key={employee.id} employee={employee} />
                    ))}
                </div>
            </div>
        );
    }, [isEmployeesLoading, isEmployeesLoadingFailed, employees, isUserAdminOrSpecialist, getEmployees]);

    const formik = useFormik<EmployeesFiltersFormValues>({
        onSubmit: onFiltersSubmit,
        initialValues,
        validationSchema,
        validateOnMount: true
    });

    const onFiltersReset = useCallback(() => {
        formik.resetForm();
        setFilterValues(initialValues);
        getEmployees(initialValues);
    }, [formik, getEmployees]);

    useEffect(() => {
        getEmployees(initialValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <FormikProvider value={formik}>
            <div className={styles.container}>
                {employeesList}
                <div className={styles.filters}>
                    <EmployeesListFilter isLoading={isEmployeesLoading} onFiltersReset={onFiltersReset} />
                </div>
            </div>
        </FormikProvider>
    );
}
