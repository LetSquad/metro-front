import React, { useCallback, useMemo } from "react";
import { useMediaQuery } from "react-responsive";

import { MOBILE_MAX_WIDTH } from "@coreUtils/constants";
import { StationTransfer } from "@models/metro/types";

import styles from "./styles/MetroLine.module.scss";

interface MetroLineProps {
    transfers: StationTransfer[];
}

export default function MetroLine({ transfers }: MetroLineProps) {
    const isMobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });

    const { lines, stations } = useMemo(() => {
        const _stations: { transfers: { name: string; key: string }[]; duration: number }[] = [];
        const _lines: { key: string; color: string; style?: React.CSSProperties }[] = [];
        for (const [id, transfer] of transfers.entries()) {
            const isFirstStation = id === 0;
            const isLastStation = id === transfers.length - 1;
            const lineKey = `${transfer.startStation.id}-${transfer.finishStation.id}`;

            if (isFirstStation) {
                _lines.push({
                    key: lineKey,
                    color: transfer.startStation.line.color,
                    // @ts-ignore
                    style: { "--first-station-color": transfer.startStation.line.color }
                });
            } else if (isLastStation) {
                _lines.push({
                    key: lineKey,
                    color: transfer.finishStation.line.color,
                    // @ts-ignore
                    style: { "--last-station-color": transfer.finishStation.line.color }
                });
            } else if (!transfer.isCrosswalking) {
                _lines.push({ key: lineKey, color: transfer.startStation.line.color });
            }

            if (!transfer.isCrosswalking) {
                _stations.push({
                    transfers: [
                        {
                            name: transfer.startStation.name,
                            key: `${transfer.startStation.name}-${transfer.startStation.id}-${transfer.startStation.line.id}`
                        },
                        {
                            name: transfer.finishStation.name,
                            key: `${transfer.finishStation.name}-${transfer.finishStation.id}-${transfer.finishStation.line.id}`
                        }
                    ],
                    duration: transfer.duration
                });
            }
        }

        return { stations: _stations, lines: _lines };
    }, [transfers]);

    const stationsMobile = useCallback(
        (index: number) => {
            if (index === 0) {
                return (
                    <>
                        <div className={styles.startStationContainer}>
                            <span className={styles.station}>{stations[index].transfers[0].name}</span>
                        </div>
                        <div className={styles.crosswalkingStationContainer}>
                            <span className={styles.station}>{stations[index].transfers[1].name}</span>
                            <span className={styles.station}>{stations[index + 1].transfers[0].name}</span>
                        </div>
                    </>
                );
            }

            if (index === lines.length - 1) {
                return (
                    <div className={styles.finishStationContainer}>
                        <span className={styles.station}>{stations[index].transfers[1].name}</span>
                    </div>
                );
            }

            return (
                <div className={styles.crosswalkingStationContainer}>
                    <span className={styles.station}>{stations[index].transfers[1].name}</span>
                    <span className={styles.station}>{stations[index + 1].transfers[0].name}</span>
                </div>
            );
        },
        [lines.length, stations]
    );

    const stationsDesktop = useCallback(
        (index: number) => (
            <>
                <span className={styles.stationTop}>{stations[index].transfers[0].name}</span>
                <span className={styles.stationBottom}>{stations[index].transfers[1].name}</span>
            </>
        ),
        [stations]
    );

    return (
        <div className={styles.container}>
            <div className={styles.linesContainer}>
                {lines.map(({ key, color, style }, index) => (
                    <div key={key} className={styles.lineContainer} style={style}>
                        {isMobile ? stationsMobile(index) : stationsDesktop(index)}
                        <span className={styles.duration}>{`${stations[index].duration / 60} мин`}</span>
                        <hr style={{ backgroundColor: color }} className={styles.line} />
                    </div>
                ))}
            </div>
        </div>
    );
}
