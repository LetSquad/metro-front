import { useCallback, useRef, useState } from "react";

import SuccessEmployeeCreationModal from "@components/AddEmployee/SuccessEmployeeCreationModal";
import EmployeeForm from "@components/EmployeeForm";
import { EmployeeFieldsName } from "@models/employee/enums";
import { EmployeeFormRef, EmployeeFormValues, NewEmployee } from "@models/employee/types";
import { createEmployeeRequest } from "@store/employee/reducer";
import { useAppDispatch } from "@store/hooks";

import styles from "./styles/AddEmployee.module.scss";

const initialValue = {
    [EmployeeFieldsName.FIRST_NAME]: undefined,
    [EmployeeFieldsName.LAST_NAME]: undefined,
    [EmployeeFieldsName.MIDDLE_NAME]: undefined,
    [EmployeeFieldsName.SEX]: undefined,
    [EmployeeFieldsName.WORK_PHONE]: undefined,
    [EmployeeFieldsName.PERSONAL_PHONE]: undefined,
    [EmployeeFieldsName.RANK]: undefined,
    [EmployeeFieldsName.SHIFT]: undefined,
    [EmployeeFieldsName.EMPLOYEE_NUMBER]: undefined,
    [EmployeeFieldsName.LIGHT_DUTIES]: false
};

export default function AddEmployee() {
    const dispatch = useAppDispatch();

    const [registerInfo, setRegisterInfo] = useState<{ login: string; password: string }>();

    const addEmployeeFormRef = useRef<EmployeeFormRef>(null);

    const onSubmitButtonClicked = useCallback(
        (values: Partial<EmployeeFormValues>) => {
            dispatch(createEmployeeRequest({ ...(values as EmployeeFormValues) })).then(({ payload, type }) => {
                const data = payload as NewEmployee;
                if (type === createEmployeeRequest.fulfilled.type) {
                    setRegisterInfo({ login: data.login, password: data.password });
                    addEmployeeFormRef?.current?.resetForm();
                }
            });
        },
        [dispatch, setRegisterInfo]
    );

    const onModalClose = useCallback(() => {
        setRegisterInfo(undefined);
    }, []);

    return (
        <>
            {registerInfo && <SuccessEmployeeCreationModal registerInfo={registerInfo} resetRegisterInfo={onModalClose} />}
            <div className={styles.container}>
                <EmployeeForm initialValues={initialValue} onSubmit={onSubmitButtonClicked} ref={addEmployeeFormRef} />
            </div>
        </>
    );
}
