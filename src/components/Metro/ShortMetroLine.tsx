import MetroStationElement from "@components/Metro/MetroStationElement";
import { faTrainSubway } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Station } from "@models/metro/types";

import styles from "./styles/ShortMetroLine.module.scss";

interface ShortMetroLineProps {
    startStation: Station;
    finishStation: Station;
    duration: number;
}

export default function ShortMetroLine({ startStation, finishStation, duration }: ShortMetroLineProps) {
    return (
        <div className={styles.container}>
            <div className={styles.stationContainer}>
                <MetroStationElement station={startStation} />
            </div>
            <div className={styles.crosswalkingIconContentContainer}>
                <span className={styles.duration}>{`${Math.round(duration / 60)} мин`}</span>
                <div className={styles.crosswalkingIconContainer}>
                    <FontAwesomeIcon className={styles.crosswalkingIcon} icon={faTrainSubway} />
                </div>
            </div>
            <div className={styles.stationContainer}>
                <MetroStationElement station={finishStation} />
            </div>
        </div>
    );
}
