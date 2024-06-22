import React from "react";
import { generatePath, Link } from "react-router-dom";

import { Segment } from "semantic-ui-react";

import { getFullName, getSexLabelBySexEnum } from "@coreUtils/utils";
import { EmployeeFieldsName } from "@models/employee/enums";
import { Employee } from "@models/employee/types";
import { PageSlugs } from "@models/pages/enums";

import styles from "./styles/EmployeeCard.module.scss";

interface EmployeeCardProps {
    employee: Employee;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
    return (
        <Link to={generatePath(PageSlugs.EMPLOYEE, { employeeId: employee.id.toString() })} className={styles.link}>
            <Segment className={styles.segment}>
                <span className={styles.name}>{getFullName(employee.firstName, employee.middleName, employee.lastName)}</span>
                <span>{getSexLabelBySexEnum(employee[EmployeeFieldsName.SEX])}</span>
                <span>{`Рабочий телефон: ${employee[EmployeeFieldsName.WORK_PHONE]}`}</span>
                <span>{`Должность: ${employee[EmployeeFieldsName.RANK].name} ${employee[EmployeeFieldsName.RANK].shortName ? `(${employee[EmployeeFieldsName.RANK].shortName})` : ""}`}</span>
                <span>{`Табельный номер: ${employee[EmployeeFieldsName.EMPLOYEE_NUMBER]}`}</span>
                <span>{`Рабочее время: ${employee[EmployeeFieldsName.SHIFT]}`}</span>
                {employee[EmployeeFieldsName.LIGHT_DUTIES] ? <span>Не может носить тяжести</span> : <span>Может носить тяжести</span>}
            </Segment>
        </Link>
    );
}
