import { Modal } from "semantic-ui-react";

import PrimaryButton from "@parts/Buttons/PrimaryButton";
import SecondaryButton from "@parts/Buttons/SecondaryButton";

import styles from "./styles/ConfirmationModal.module.scss";

type ConfirmationModalProps = {
    title?: string;
    confirmationText: string;
    action: () => void;
    cancelAction: () => void;
};

export default function ConfirmationModal({
    action,
    confirmationText,
    cancelAction,
    title = "Подтверждение обновления"
}: ConfirmationModalProps) {
    return (
        <Modal open size="mini" className={styles.confirmation}>
            <Modal.Header className={styles.confirmationHeader}>{title}</Modal.Header>
            <Modal.Content className={styles.confirmationContent}>
                <p>{confirmationText}</p>
            </Modal.Content>
            <Modal.Actions className={styles.confirmationActions}>
                <SecondaryButton className={styles.confirmationButton} onClick={cancelAction} type="button">
                    Отмена
                </SecondaryButton>
                <PrimaryButton className={styles.confirmationButton} onClick={action} type="button">
                    Да
                </PrimaryButton>
            </Modal.Actions>
        </Modal>
    );
}
