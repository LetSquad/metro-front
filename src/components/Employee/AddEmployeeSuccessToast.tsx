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
    createdEmployeeId: number;
}

export default function AddEmployeeSuccessToast({ toast: t, createdEmployeeId }: AddOrderSuccessToastProps) {
    const navigate = useNavigate();

    const goToEmployeesPage = useCallback(() => navigate(PageSlugs.EMPLOYEES), [navigate]);

    const goToEmployeePage = useCallback(
        () => navigate(generatePath(PageSlugs.EMPLOYEE, { employeeId: createdEmployeeId.toString() })),
        [createdEmployeeId, navigate]
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
                <span className={customSuccessToastStyles.successToastText}>Сотрудник успешно создан!</span>
                <div className={customSuccessToastStyles.successToastButtonContainer}>
                    <SecondaryButton
                        className={customSuccessToastStyles.successToastButton}
                        onClick={() => {
                            goToEmployeesPage();
                            toast.dismiss(t.id);
                        }}
                    >
                        Перейти к списку сотрудников
                    </SecondaryButton>
                    <PrimaryButton
                        className={customSuccessToastStyles.successToastButton}
                        color="positive"
                        onClick={() => {
                            goToEmployeePage();
                            toast.dismiss(t.id);
                        }}
                    >
                        Перейти к карточке сотрудника
                    </PrimaryButton>
                </div>
            </div>
            <Icon name="remove" className={customSuccessToastStyles.toastDismissIcon} onClick={() => toast.dismiss(t.id)} link />
        </div>
    );
}
