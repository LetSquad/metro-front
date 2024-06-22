import { useCallback, useRef } from "react";

import PassengerForm from "@components/PassengerForm";
import { PassengerFieldsName, PassengerPhoneFieldsName } from "@models/passenger/enums";
import { PassengerFormRef, PassengerFormValues, PassengerPhone } from "@models/passenger/types";
import { useAppDispatch } from "@store/hooks";
import { createPassengerRequest } from "@store/passenger/reducer";

import styles from "./styles/AddPassenger.module.scss";

const initialValue = {
    [PassengerFieldsName.FIRST_NAME]: undefined,
    [PassengerFieldsName.LAST_NAME]: undefined,
    [PassengerFieldsName.MIDDLE_NAME]: undefined,
    [PassengerFieldsName.SEX]: undefined,
    [PassengerFieldsName.CATEGORY]: undefined,
    [PassengerFieldsName.COMMENT]: undefined,
    [PassengerFieldsName.HAS_PACEMAKER]: false,
    [PassengerFieldsName.PHONES]: [
        {
            [PassengerPhoneFieldsName.PHONE]: undefined,
            [PassengerPhoneFieldsName.DESCRIPTION]: undefined
        }
    ]
};

export default function AddPassenger() {
    const dispatch = useAppDispatch();

    const addPassengerFormRef = useRef<PassengerFormRef>(null);

    const onSubmitButtonClicked = useCallback(
        (values: Partial<Omit<PassengerFormValues, "phones">> & { phones: Partial<PassengerPhone>[] }) => {
            dispatch(createPassengerRequest({ ...(values as PassengerFormValues) })).then((payload) => {
                if (payload.type === createPassengerRequest.fulfilled.type) {
                    addPassengerFormRef?.current?.resetForm();
                }
            });
        },
        [dispatch]
    );

    return (
        <div className={styles.container}>
            <PassengerForm initialValues={initialValue} onSubmit={onSubmitButtonClicked} ref={addPassengerFormRef} />
        </div>
    );
}
