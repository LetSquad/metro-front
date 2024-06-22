import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

import classNames from "classnames";

import EmployeeForm from "@components/EmployeeForm";
import flipEditCardPartsStyles from "@coreStyles/flipEditCardParts.module.scss";
import { useChangeEditSearchParam } from "@hooks/useChangeEditSearchParam";
import { EmployeeFieldsName, EmployeeRole } from "@models/employee/enums";
import { Employee, EmployeeFormValues } from "@models/employee/types";
import BlockIcons from "@parts/BlockIcons/BlockIcons";
import { updateEmployeeRequest } from "@store/employee/reducer";
import { selectCurrentEmployeeRole } from "@store/employee/selectors";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import EmployeeInfoDetails from "./EmployeeInfoDetails";
import styles from "./styles/EmployeeInfo.module.scss";

interface EmployeeInfoProps {
    employee: Employee;
}

export default function EmployeeInfo({ employee }: EmployeeInfoProps) {
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();
    const changeEditParam = useChangeEditSearchParam();

    const currentEmployeeRole = useAppSelector(selectCurrentEmployeeRole);

    const isUserAdminOrSpecialist = currentEmployeeRole === EmployeeRole.ADMIN || currentEmployeeRole === EmployeeRole.SPECIALIST;

    const [isEmployeeEdit, setIsEmployeeEdit] = useState(searchParams.get("edit") && isUserAdminOrSpecialist);

    const changeEditState = useCallback(
        (state: boolean) => {
            if (isUserAdminOrSpecialist) {
                setIsEmployeeEdit(state);
                changeEditParam(state);
            }
        },
        [changeEditParam, isUserAdminOrSpecialist]
    );

    const onSubmitButtonClicked = useCallback(
        (values: Partial<EmployeeFormValues>) => {
            if (isUserAdminOrSpecialist) {
                dispatch(updateEmployeeRequest({ ...(values as EmployeeFormValues), employeeId: employee.id })).then((payload) => {
                    if (payload.type === updateEmployeeRequest.fulfilled.type) {
                        changeEditState(false);
                    }
                });
            }
        },
        [changeEditState, dispatch, employee.id, isUserAdminOrSpecialist]
    );

    const initialValue = useMemo(
        () => ({
            [EmployeeFieldsName.FIRST_NAME]: employee[EmployeeFieldsName.FIRST_NAME],
            [EmployeeFieldsName.LAST_NAME]: employee[EmployeeFieldsName.LAST_NAME],
            [EmployeeFieldsName.MIDDLE_NAME]: employee[EmployeeFieldsName.MIDDLE_NAME] ?? undefined,
            [EmployeeFieldsName.SEX]: employee[EmployeeFieldsName.SEX],
            [EmployeeFieldsName.RANK]: employee[EmployeeFieldsName.RANK].code,
            [EmployeeFieldsName.SHIFT]: employee[EmployeeFieldsName.SHIFT],
            [EmployeeFieldsName.WORK_PHONE]: employee[EmployeeFieldsName.WORK_PHONE],
            [EmployeeFieldsName.PERSONAL_PHONE]: employee[EmployeeFieldsName.PERSONAL_PHONE] ?? undefined,
            [EmployeeFieldsName.EMPLOYEE_NUMBER]: employee[EmployeeFieldsName.EMPLOYEE_NUMBER],
            [EmployeeFieldsName.LIGHT_DUTIES]: employee[EmployeeFieldsName.LIGHT_DUTIES] ?? false
        }),
        [employee]
    );

    useEffect(() => {
        return () => {
            toast.dismiss(`employee-locked-for-edit-${employee.id}`);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={classNames({
                [flipEditCardPartsStyles.segment]: !isEmployeeEdit,
                [flipEditCardPartsStyles.segmentEdit]: isEmployeeEdit
            })}
        >
            {isEmployeeEdit && isUserAdminOrSpecialist ? (
                <EmployeeForm
                    initialValues={initialValue}
                    onSubmit={onSubmitButtonClicked}
                    onCancel={() => changeEditState(false)}
                    className={flipEditCardPartsStyles.editContent}
                    employeeId={employee.id}
                    isEdit
                />
            ) : (
                <div className={flipEditCardPartsStyles.info}>
                    {isUserAdminOrSpecialist && (
                        <div className={styles.actionController}>
                            <BlockIcons onEditClick={() => changeEditState(true)} />
                        </div>
                    )}
                    <EmployeeInfoDetails employee={employee} />
                </div>
            )}
        </div>
    );
}
