import React from "react";
import { Link } from "react-router-dom";

import { PageSlugs } from "@models/pages/enums";
import PrimaryButton from "@parts/Buttons/PrimaryButton";

import styles from "./styles/PassengersListHeader.module.scss";

export default function PassengersListHeader() {
    return (
        <div className={styles.container}>
            <Link to={PageSlugs.PASSENGER_REGISTER}>
                <PrimaryButton>Создать пользователя</PrimaryButton>
            </Link>
            <Link to={PageSlugs.ORDER_NEW}>
                <PrimaryButton>Создать заявку</PrimaryButton>
            </Link>
        </div>
    );
}
