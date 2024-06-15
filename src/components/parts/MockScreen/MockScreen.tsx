import { Segment } from "semantic-ui-react";

import mockImage from "@static/images/mock.png";

import styles from "./styles/MockScreen.module.scss";

export default function MockScreen() {
    return (
        <div className={styles.container}>
            <Segment className={styles.segment}>
                <span className={styles.text}>Мы очень старались, но не успели закончить интерфейс этой страницы</span>
                <img className={styles.image} src={mockImage} alt="mock" />
            </Segment>
        </div>
    );
}
