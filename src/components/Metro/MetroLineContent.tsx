import React, { useCallback } from "react";

import { faPersonWalking } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./styles/MetroLineContent.module.scss";

interface MetroLineMobileProps {
    transfers: {
        stations: string[];
        duration: number;
        isCrossWalking: boolean;
        lineIndex?: number;
        key: string;
    }[];
    lines: { color: string }[];
}

export default function MetroLineContent({ transfers, lines }: MetroLineMobileProps) {
    const duration = useCallback(
        (transfer: { stations: string[]; duration: number; isCrossWalking: boolean; lineIndex?: number; key: string }) => (
            <span className={styles.duration}>{`${Math.ceil(transfer.duration / 60)} мин`}</span>
        ),
        []
    );

    const line = useCallback(
        (lineColor: string) => (
            <hr
                style={{
                    backgroundColor: lineColor,
                    border: lineColor === "#FFFFFF" ? "1px solid #EF161E" : undefined
                }}
                className={styles.line}
            />
        ),
        []
    );

    const crosswalkingContent = useCallback(
        (index: number) => {
            const transfer = transfers[index];
            return (
                <div className={styles.crosswalkingStationContainer}>
                    <span className={styles.station}>{transfer.stations[0]}</span>
                    <div className={styles.crosswalkingIconContentContainer}>
                        <div className={styles.crosswalkingIconContent}>
                            <div className={styles.crosswalkingIconContainer}>
                                <FontAwesomeIcon icon={faPersonWalking} className={styles.crosswalkingIcon} />
                            </div>
                            {duration(transfer)}
                        </div>
                    </div>
                    <span className={styles.station}>{transfer.stations[1]}</span>
                </div>
            );
        },
        [duration, transfers]
    );

    const lineContent = useCallback(
        (index: number) => {
            const transfer = transfers[index];
            const lineIndex = transfer.lineIndex as number;
            const lineColor = lines[lineIndex].color;

            if (transfers.length === 1) {
                return (
                    <>
                        <span className={styles.station}>{transfer.stations[0]}</span>
                        <div className={styles.lineContainer}>
                            {duration(transfer)}
                            {line(lineColor)}
                        </div>
                        <span className={styles.station}>{transfer.stations[1]}</span>
                    </>
                );
            }

            if (index === 0) {
                return (
                    <>
                        <span className={styles.station}>{transfer.stations[0]}</span>
                        <div className={styles.lineContainer}>
                            {duration(transfer)}
                            {line(lineColor)}
                        </div>
                    </>
                );
            }
            if (index === transfers.length - 1) {
                return (
                    <>
                        <div className={styles.lineContainer}>
                            {duration(transfer)}
                            {line(lineColor)}
                        </div>
                        <span className={styles.station}>{transfer.stations[1]}</span>
                    </>
                );
            }

            return (
                <div className={styles.lineContainer}>
                    {duration(transfer)}
                    {line(lineColor)}
                </div>
            );
        },
        [duration, line, lines, transfers]
    );

    return (
        <div className={styles.transfersContainer}>
            {transfers.map(({ key, isCrossWalking, lineIndex }, index) =>
                isCrossWalking ? (
                    crosswalkingContent(index)
                ) : (
                    <div
                        className={styles.lineContentContainer}
                        key={key}
                        style={{
                            // @ts-ignore
                            "--dot-color": lines[lineIndex as number].color,
                            "--dot-border": lines[lineIndex as number].color === "#FFFFFF" ? "1px solid #EF161E" : undefined
                        }}
                    >
                        {lineContent(index)}
                    </div>
                )
            )}
        </div>
    );
}
