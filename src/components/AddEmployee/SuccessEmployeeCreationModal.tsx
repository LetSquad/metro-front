import { Icon, Modal, ModalActions, ModalContent, ModalHeader } from "semantic-ui-react";

import PrimaryButton from "@parts/Buttons/PrimaryButton";

import styles from "./styles/SuccessEmployeeCreationModal.module.scss";

interface SuccessEmployeeCreationModalProps {
    registerInfo: { login: string; password: string };
    resetRegisterInfo: () => void;
}

export default function SuccessEmployeeCreationModal({ registerInfo, resetRegisterInfo }: SuccessEmployeeCreationModalProps) {
    return (
        <Modal open closeOnEscape={false} closeOnDimmerClick={false} closeOnDocumentClick={false}>
            <ModalHeader>Вы зарегистрировали нового сотрудника!</ModalHeader>
            <ModalContent>
                <div className={styles.modalContentContainer}>
                    <span className={styles.modalContentHeader}>
                        Ниже представлены данные для входа нового сотрудника в систему.{" "}
                        <span className={styles.modalContentHeaderNotice}>Запишите их, так как они будут представлены единожды</span>
                    </span>
                    <div className={styles.modalContentInfoBlock}>
                        <div className={styles.modalContentMainInfoContainer}>
                            <span>
                                Логин: <span className={styles.modalContentMainInfo}>{registerInfo?.login}</span>
                            </span>
                            <Icon
                                name="copy outline"
                                link
                                onClick={() => navigator.clipboard.writeText(registerInfo?.login as string)}
                            />
                        </div>
                        <div className={styles.modalContentMainInfoContainer}>
                            <span>
                                Пароль: <span className={styles.modalContentMainInfo}>{registerInfo?.password}</span>
                            </span>
                            <Icon
                                name="copy outline"
                                link
                                onClick={() => navigator.clipboard.writeText(registerInfo?.password as string)}
                            />
                        </div>
                    </div>
                </div>
            </ModalContent>
            <ModalActions>
                <PrimaryButton onClick={resetRegisterInfo}>Закрыть</PrimaryButton>
            </ModalActions>
        </Modal>
    );
}
