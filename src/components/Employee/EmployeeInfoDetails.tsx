import { Segment } from "semantic-ui-react";

import { getFullName, getSexLabelBySexEnum } from "@coreUtils/utils";
import { EmployeeFieldsName } from "@models/employee/enums";
import { Employee } from "@models/employee/types";

import styles from "./styles/EmployeeInfoDetails.module.scss";

interface EmployeeInfoProps {
    employee: Employee;
}

export default function EmployeeInfoDetails({ employee }: EmployeeInfoProps) {
    return (
        <Segment className={styles.segment}>
            <span className={styles.name}>{getFullName(employee.firstName, employee.middleName, employee.lastName)}</span>
            <div className={styles.contentContainer}>
                <div className={styles.contentBlock}>
                    <span>{getSexLabelBySexEnum(employee[EmployeeFieldsName.SEX])}</span>
                    <span>{`Рабочий телефон: ${employee[EmployeeFieldsName.WORK_PHONE]}`}</span>
                    {employee[EmployeeFieldsName.PERSONAL_PHONE] && (
                        <span>{`Личный телефон: ${employee[EmployeeFieldsName.PERSONAL_PHONE]}`}</span>
                    )}
                </div>
                <div className={styles.contentBlock}>
                    <span>{`Должность: ${employee[EmployeeFieldsName.RANK].name} ${employee[EmployeeFieldsName.RANK].shortName ? `(${employee[EmployeeFieldsName.RANK].shortName})` : ""}`}</span>
                    <span>{`Табельный номер: ${employee[EmployeeFieldsName.EMPLOYEE_NUMBER]}`}</span>
                    <span>{`Рабочее время: ${employee[EmployeeFieldsName.SHIFT]}`}</span>
                    {employee[EmployeeFieldsName.LIGHT_DUTIES] ? (
                        <span>Не может носить тяжести</span>
                    ) : (
                        <span>Может носить тяжести</span>
                    )}
                </div>
            </div>
        </Segment>
    );
}
