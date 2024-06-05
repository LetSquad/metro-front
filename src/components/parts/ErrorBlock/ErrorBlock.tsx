import styles from "./styles/ErrorBlock.module.scss";

interface ErrorBlockProps {
    text?: string;
}

const BASE_TEXT = "Извините, что-то пошло не так. Повторите попытку позднее";

export default function ErrorBlock({ text = BASE_TEXT }: ErrorBlockProps) {
    return (
        <div className={styles.error}>
            <h1>{text}</h1>
        </div>
    );
}
