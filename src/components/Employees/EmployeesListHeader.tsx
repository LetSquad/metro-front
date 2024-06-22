import React from "react";
import { Link } from "react-router-dom";

import { PageSlugs } from "@models/pages/enums";
import PrimaryButton from "@parts/Buttons/PrimaryButton";

import styles from "./styles/EmployeesListHeader.module.scss";

export default function EmployeesListHeader() {
    return (
        <div className={styles.container}>
            <Link to={PageSlugs.EMPLOYEE_REGISTER}>
                <PrimaryButton>Создать сотрудника</PrimaryButton>
            </Link>
        </div>
    );
}
