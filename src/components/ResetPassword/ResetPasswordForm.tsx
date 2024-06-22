import { Modal } from "semantic-ui-react";

import ResetPasswordCard from "@components/ResetPassword/ResetPassword/ResetPasswordCard";

import styles from "./styles/ResetPasswordForm.module.scss";

export default function ResetPasswordForm() {
    return (
        <Modal open closeOnDimmerClick={false} closeOnEscape={false} closeIcon={false} className={styles.modal} size="mini">
            <div className={styles.resetPassword}>
                <ResetPasswordCard />
            </div>
        </Modal>
    );
}
