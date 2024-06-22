import { useCallback } from "react";
import { Toast, toast } from "react-hot-toast";
import { generatePath, useNavigate } from "react-router-dom";

import classNames from "classnames";
import { Icon } from "semantic-ui-react";

import customSuccessToastStyles from "@coreStyles/customSuccessToast.module.scss";
import { PageSlugs } from "@models/pages/enums";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import SecondaryButton from "@parts/Buttons/SecondaryButton";

interface AddPassengerSuccessToastProps {
    toast: Toast;
    createdPassengerId: number;
}

export default function AddPassengerSuccessToast({ toast: t, createdPassengerId }: AddPassengerSuccessToastProps) {
    const navigate = useNavigate();

    const goToPassengersPage = useCallback(() => navigate(PageSlugs.PASSENGERS), [navigate]);

    const goToPassengerPage = useCallback(
        () => navigate(generatePath(PageSlugs.PASSENGER, { passengerId: createdPassengerId.toString() })),
        [createdPassengerId, navigate]
    );

    return (
        <div
            className={classNames(
                {
                    [customSuccessToastStyles.successToastEnter]: t.visible,
                    [customSuccessToastStyles.successToastExit]: !t.visible
                },
                customSuccessToastStyles.successToast
            )}
        >
            <div className={customSuccessToastStyles.successToastContent}>
                <span className={customSuccessToastStyles.successToastText}>
                    Пассажир успешно создан! Теперь можно создать на него заявку
                </span>
                <div className={customSuccessToastStyles.successToastButtonContainer}>
                    <SecondaryButton
                        className={customSuccessToastStyles.successToastButton}
                        onClick={() => {
                            goToPassengersPage();
                            toast.dismiss(t.id);
                        }}
                    >
                        Перейти к списку пассажиров
                    </SecondaryButton>
                    <PrimaryButton
                        className={customSuccessToastStyles.successToastButton}
                        color="positive"
                        onClick={() => {
                            goToPassengerPage();
                            toast.dismiss(t.id);
                        }}
                    >
                        Перейти к пассажиру
                    </PrimaryButton>
                </div>
            </div>
            <Icon name="remove" className={customSuccessToastStyles.toastDismissIcon} onClick={() => toast.dismiss(t.id)} link />
        </div>
    );
}
