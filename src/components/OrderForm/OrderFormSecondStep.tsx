import MetroLine from "@components/Metro/MetroLine";
import { formatMinutesCount } from "@coreUtils/timeUtils";
import { useAppSelector } from "@store/hooks";
import { selectOrderCalculation } from "@store/order/selectors";

import styles from "./styles/OrderFormSecondStep.module.scss";

export default function OrderFormSecondStep() {
    const orderCalculation = useAppSelector(selectOrderCalculation);

    return (
        orderCalculation && (
            <div className={styles.container}>
                <span>
                    Общая продолжительность маршрута:{" "}
                    <span className={styles.timeLabel}>{formatMinutesCount(orderCalculation.duration / 60)}</span>
                </span>
                <MetroLine transfers={orderCalculation.transfers} />
            </div>
        )
    );
}
