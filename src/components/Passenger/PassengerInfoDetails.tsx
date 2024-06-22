import { Accordion, AccordionContent, AccordionTitle, Icon, Segment } from "semantic-ui-react";

import { formatPhoneNumber, getFullName, getSexLabelBySexEnum } from "@coreUtils/utils";
import { useToggle } from "@hooks/useToogle";
import { PassengerFieldsName } from "@models/passenger/enums";
import { Passenger } from "@models/passenger/types";

import styles from "./styles/PassengerInfoDetails.module.scss";

interface PassengerInfoProps {
    passenger: Passenger;
}

export default function PassengerInfoDetails({ passenger }: PassengerInfoProps) {
    const [isPhonesOpen, togglePhoneAccordion] = useToggle();

    return (
        <Segment className={styles.segment}>
            <span className={styles.name}>{getFullName(passenger.firstName, passenger.middleName, passenger.lastName)}</span>
            <span>{getSexLabelBySexEnum(passenger[PassengerFieldsName.SEX])}</span>
            <span>{`Категория: ${passenger[PassengerFieldsName.CATEGORY].shortName} (${passenger[PassengerFieldsName.CATEGORY].name})`}</span>
            {passenger.hasPacemaker && <span>Есть ЭКС</span>}
            {passenger.comment && <span>{`Дополнительная информация о пассажире: ${passenger.comment}`}</span>}
            <Accordion>
                <AccordionTitle index={0} active={isPhonesOpen} onClick={togglePhoneAccordion}>
                    <Icon name="dropdown" />
                    Телефоны пользователя
                </AccordionTitle>
                <AccordionContent active={isPhonesOpen}>
                    {passenger[PassengerFieldsName.PHONES] && passenger[PassengerFieldsName.PHONES].length > 0 ? (
                        <div className={styles.passengerPhonesContent}>
                            {passenger[PassengerFieldsName.PHONES].map((passengerPhone) => (
                                <span key={`${passenger.id}-${passengerPhone.phone}`}>
                                    {`${formatPhoneNumber(passengerPhone.phone)} - ${passengerPhone.description}`}
                                </span>
                            ))}
                        </div>
                    ) : (
                        "Телефоны пассажира не указаны"
                    )}
                </AccordionContent>
            </Accordion>
        </Segment>
    );
}
