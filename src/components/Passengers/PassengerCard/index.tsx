import React from "react";
import { generatePath, Link } from "react-router-dom";

import { Segment } from "semantic-ui-react";

import { getFullName, getSexLabelBySexEnum } from "@coreUtils/utils";
import { PageSlugs } from "@models/pages/enums";
import { PassengerFieldsName } from "@models/passenger/enums";
import { Passenger } from "@models/passenger/types";

import styles from "./styles/PassengerCard.module.scss";

interface PassengerCardProps {
    passenger: Passenger;
}

export default function PassengerCard({ passenger }: PassengerCardProps) {
    return (
        <Link to={generatePath(PageSlugs.PASSENGER, { passengerId: passenger.id.toString() })} className={styles.link}>
            <Segment className={styles.segment}>
                <span className={styles.name}>{getFullName(passenger.firstName, passenger.middleName, passenger.lastName)}</span>
                <span>{getSexLabelBySexEnum(passenger[PassengerFieldsName.SEX])}</span>
                <span>{`Категория: ${passenger[PassengerFieldsName.CATEGORY].shortName} (${passenger[PassengerFieldsName.CATEGORY].name})`}</span>
                {passenger.hasPacemaker && <span>Есть ЭКС</span>}
                {passenger.comment && <span>{`Дополнительная информация о пассажире: ${passenger.comment}`}</span>}
            </Segment>
        </Link>
    );
}
