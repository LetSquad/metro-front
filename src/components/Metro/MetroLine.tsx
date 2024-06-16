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

    const filteredTransfers = useMemo(
        () => transfers.filter((transfer, index) => !(transfer.isCrosswalking && (index === 0 || index === transfers.length - 1))),
        [transfers]
    );

    const { lines, stations } = useMemo(() => {
        const _stations: { transfers: { name: string; key: string }[]; duration: number }[] = [];
        const _lines: { key: string; color: string; style?: React.CSSProperties }[] = [];

        if (filteredTransfers.length === 1) {
            const transfer = filteredTransfers[0];
            return {
                stations: [
                    {
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
                    }
                ],
                lines: [
                    {
                        key: `${transfer.startStation.id}-${transfer.finishStation.id}`,
                        color: transfer.startStation.line.color,
                        // @ts-ignore
                        style: {
                            "--first-station-color": transfer.startStation.line.color,
                            "--last-station-color": transfer.finishStation.line.color
                        }
                    }
                ]
            };
        }

        for (const [id, transfer] of filteredTransfers.entries()) {
            const isFirstStation = id === 0;
            const isLastStation = id === filteredTransfers.length - 1;
            const lineKey = `${transfer.startStation.id}-${transfer.finishStation.id}`;

            if (isFirstStation) {
                _lines.push({
                    key: lineKey,
                    color: transfer.startStation.line.color,
                    style: {
                        // @ts-ignore
                        "--first-station-color": transfer.startStation.line.color,
                        "--first-station-border": transfer.startStation.line.color === "#FFFFFF" ? "1px solid #EF161E" : 0
                    }
                });
            } else if (isLastStation) {
                _lines.push({
                    key: lineKey,
                    color: transfer.finishStation.line.color,
                    style: {
                        // @ts-ignore
                        "--last-station-color": transfer.finishStation.line.color,
                        "--last-station-border": transfer.finishStation.line.color === "#FFFFFF" ? "1px solid #EF161E" : 0
                    }
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
    }, [filteredTransfers]);

    const stationsMobile = useCallback(
        (index: number) => {
            if (filteredTransfers.length === 1) {
                return (
                    <>
                        <div className={styles.startStationContainer}>
                            <span className={styles.station}>{stations[index].transfers[0].name}</span>
                        </div>
                        <div className={styles.finishStationContainer}>
                            <span className={styles.station}>{stations[index].transfers[1].name}</span>
                        </div>
                    </>
                );
            }

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
        [lines.length, stations, filteredTransfers.length]
    );

    const stationsDesktop = useCallback(
        (index: number) => {
            if (filteredTransfers.length === 1) {
                return (
                    <>
                        <span className={styles.stationTop}>{stations[index].transfers[0].name}</span>
                        <span className={styles.stationBottom}>{stations[index].transfers[1].name}</span>
                    </>
                );
            }

            if (index === 0) {
                return (
                    <>
                        <span className={styles.stationTop}>{stations[index].transfers[0].name}</span>
                        <span className={styles.stationBottom}>{stations[index + 1].transfers[0].name}</span>
                    </>
                );
            }

            if (index === lines.length - 1) {
                return (
                    <>
                        <span className={styles.stationTop}>{stations[index - 1].transfers[1].name}</span>
                        <span className={styles.stationBottom}>{stations[index].transfers[1].name}</span>
                    </>
                );
            }

            return (
                <>
                    <span className={styles.stationTop}>{stations[index - 1].transfers[1].name}</span>
                    <span className={styles.stationBottom}>{stations[index + 1].transfers[0].name}</span>
                </>
            );
        },
        [filteredTransfers.length, lines.length, stations]
    );

    return (
        <div className={styles.container}>
            <div className={styles.linesContainer}>
                {lines.map(({ key, color, style }, index) => (
                    /* @ts-ignore */
                    <div key={key} className={styles.lineContainer} style={style}>
                        {isMobile ? stationsMobile(index) : stationsDesktop(index)}
                        <span className={styles.duration}>{`${Math.round(stations[index].duration / 60)} мин`}</span>
                        <hr
                            style={{ backgroundColor: color, border: color === "#FFFFFF" ? "1px solid #EF161E" : undefined }}
                            className={styles.line}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
