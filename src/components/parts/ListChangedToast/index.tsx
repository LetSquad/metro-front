import { Toast, toast } from "react-hot-toast";

import classNames from "classnames";
import { Icon } from "semantic-ui-react";

import customSuccessToastStyles from "@coreStyles/customSuccessToast.module.scss";
import PrimaryButton from "@parts/Buttons/PrimaryButton";

interface ListChangedToastProps {
    toast: Toast;
    onClick: () => void;
}

export default function ListChangedToast({ toast: t, onClick }: ListChangedToastProps) {
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
                <span className={customSuccessToastStyles.successToastText}>Список изменился. Нажмите, чтобы применить изменения</span>
                <div className={customSuccessToastStyles.successToastButtonContainer}>
                    <PrimaryButton
                        className={customSuccessToastStyles.successToastButton}
                        color="positive"
                        onClick={() => {
                            onClick();
                            toast.dismiss(t.id);
                        }}
                    >
                        Обновить
                    </PrimaryButton>
                </div>
            </div>
            <Icon name="remove" className={customSuccessToastStyles.toastDismissIcon} onClick={() => toast.dismiss(t.id)} link />
        </div>
    );
}
