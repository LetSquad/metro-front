import { getMetroLineLogoByEnum } from "@coreUtils/metroUtils";
import { Station } from "@models/metro/types";

import styles from "./styles/MetroStationElement.module.scss";

interface MetroStationProps {
    station: Station;
}

export default function MetroStationElement({ station }: MetroStationProps) {
    return (
        <div className={styles.container}>
            <img src={getMetroLineLogoByEnum(station.line.id)} alt={station.line.name} className={styles.lineLogo} />
            <span className={styles.station}>{station.name}</span>
        </div>
    );
}
