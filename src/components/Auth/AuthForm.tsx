import { Modal } from "semantic-ui-react";

import SignInCard from "@components/Auth/SignIn/SignInCard";

import styles from "./styles/AuthForm.module.scss";

export default function AuthForm() {
    return (
        <Modal open closeOnDimmerClick={false} closeOnEscape={false} closeIcon={false} className={styles.modal} size="mini">
            <div className={styles.auth}>
                <SignInCard />
            </div>
        </Modal>
    );
}
