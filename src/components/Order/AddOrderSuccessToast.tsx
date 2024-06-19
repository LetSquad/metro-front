import { useCallback } from "react";
import { Toast, toast } from "react-hot-toast";
import { generatePath, useNavigate } from "react-router-dom";

import classNames from "classnames";
import { Icon } from "semantic-ui-react";

import customSuccessToastStyles from "@coreStyles/customSuccessToast.module.scss";
import { PageSlugs } from "@models/pages/enums";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import SecondaryButton from "@parts/Buttons/SecondaryButton";

interface AddOrderSuccessToastProps {
    toast: Toast;
    createdOrderId: number;
}

export default function AddOrderSuccessToast({ toast: t, createdOrderId }: AddOrderSuccessToastProps) {
    const navigate = useNavigate();

    const goToOrdersPage = useCallback(() => navigate(PageSlugs.ORDERS), [navigate]);

    const goToOrderPage = useCallback(
        () => navigate(generatePath(PageSlugs.ORDER, { orderId: createdOrderId.toString() })),
        [createdOrderId, navigate]
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
                <span className={customSuccessToastStyles.successToastText}>Заявка успешно создана! Теперь ее можно распределить</span>
                <div className={customSuccessToastStyles.successToastButtonContainer}>
                    <SecondaryButton
                        className={customSuccessToastStyles.successToastButton}
                        onClick={() => {
                            goToOrdersPage();
                            toast.dismiss(t.id);
                        }}
                    >
                        Перейти к списку заявок
                    </SecondaryButton>
                    <PrimaryButton
                        className={customSuccessToastStyles.successToastButton}
                        color="positive"
                        onClick={() => {
                            goToOrderPage();
                            toast.dismiss(t.id);
                        }}
                    >
                        Перейти к заявке
                    </PrimaryButton>
                </div>
            </div>
            <Icon name="remove" className={customSuccessToastStyles.toastDismissIcon} onClick={() => toast.dismiss(t.id)} link />
        </div>
    );
}
