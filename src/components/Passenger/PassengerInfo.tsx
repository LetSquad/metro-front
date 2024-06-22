import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

import classNames from "classnames";

import PassengerInfoDetails from "@components/Passenger/PassengerInfoDetails";
import PassengerForm from "@components/PassengerForm";
import flipEditCardPartsStyles from "@coreStyles/flipEditCardParts.module.scss";
import { useChangeEditSearchParam } from "@hooks/useChangeEditSearchParam";
import { PassengerFieldsName } from "@models/passenger/enums";
import { Passenger, PassengerFormValues, PassengerPhone } from "@models/passenger/types";
import BlockIcons from "@parts/BlockIcons/BlockIcons";
import { useAppDispatch } from "@store/hooks";
import { updatePassengerRequest } from "@store/passenger/reducer";

import styles from "./styles/PassengerInfo.module.scss";

interface PassengerInfoProps {
    passenger: Passenger;
}

export default function PassengerInfo({ passenger }: PassengerInfoProps) {
    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();
    const changeEditParam = useChangeEditSearchParam();

    const [isPassengerEdit, setIsPassengerEdit] = useState(searchParams.get("edit") || false);

    const changeEditState = useCallback(
        (state: boolean) => {
            setIsPassengerEdit(state);
            changeEditParam(state);
        },
        [changeEditParam]
    );

    const onSubmitButtonClicked = useCallback(
        (values: Partial<Omit<PassengerFormValues, "phones">> & { phones: Partial<PassengerPhone>[] }) => {
            dispatch(updatePassengerRequest({ ...(values as PassengerFormValues), passengerId: passenger.id })).then((payload) => {
                if (payload.type === updatePassengerRequest.fulfilled.type) {
                    changeEditState(false);
                }
            });
        },
        [changeEditState, dispatch, passenger.id]
    );

    const initialValue = useMemo(
        () => ({
            [PassengerFieldsName.FIRST_NAME]: passenger[PassengerFieldsName.FIRST_NAME],
            [PassengerFieldsName.LAST_NAME]: passenger[PassengerFieldsName.LAST_NAME],
            [PassengerFieldsName.MIDDLE_NAME]: passenger[PassengerFieldsName.MIDDLE_NAME] ?? undefined,
            [PassengerFieldsName.SEX]: passenger[PassengerFieldsName.SEX],
            [PassengerFieldsName.CATEGORY]: passenger[PassengerFieldsName.CATEGORY].code,
            [PassengerFieldsName.HAS_PACEMAKER]: passenger[PassengerFieldsName.HAS_PACEMAKER] ?? false,
            [PassengerFieldsName.COMMENT]: passenger[PassengerFieldsName.COMMENT] ?? undefined,
            [PassengerFieldsName.PHONES]: passenger[PassengerFieldsName.PHONES] ?? []
        }),
        [passenger]
    );

    useEffect(() => {
        return () => {
            toast.dismiss(`passenger-locked-for-edit-${passenger.id}`);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={classNames({
                [flipEditCardPartsStyles.segment]: !isPassengerEdit,
                [flipEditCardPartsStyles.segmentEdit]: isPassengerEdit
            })}
        >
            {isPassengerEdit ? (
                <PassengerForm
                    initialValues={initialValue}
                    onSubmit={onSubmitButtonClicked}
                    onCancel={() => changeEditState(false)}
                    className={flipEditCardPartsStyles.editContent}
                    passengerId={passenger.id}
                    isEdit
                />
            ) : (
                <div className={flipEditCardPartsStyles.info}>
                    <div className={styles.actionController}>
                        <BlockIcons onEditClick={() => changeEditState(true)} />
                    </div>
                    <PassengerInfoDetails passenger={passenger} />
                </div>
            )}
        </div>
    );
}
