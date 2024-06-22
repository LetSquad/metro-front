import React, { useMemo } from "react";

import MetroLineContent from "@components/Metro/MetroLineContent";
import { StationTransfer } from "@models/metro/types";

interface MetroLineProps {
    transfers: StationTransfer[];
}

export default function MetroLine({ transfers: routeTransfers }: MetroLineProps) {
    const { lines, transfers } = useMemo(() => {
        const configuredTransfers: {
            stations: string[];
            duration: number;
            isCrossWalking: boolean;
            lineIndex?: number;
            key: string;
        }[] = [];
        const _lines: { color: string }[] = [];

        for (const transfer of routeTransfers) {
            configuredTransfers.push({
                stations: [transfer.startStation.name, transfer.finishStation.name],
                duration: transfer.duration,
                isCrossWalking: transfer.isCrosswalking,
                lineIndex: transfer.isCrosswalking ? undefined : _lines.length,
                key: `${transfer.startStation.id}-${transfer.finishStation.id}`
            });

            if (!transfer.isCrosswalking) {
                _lines.push({
                    color: transfer.startStation.line.color
                });
            }
        }

        return { transfers: configuredTransfers, lines: _lines };
    }, [routeTransfers]);

    return <MetroLineContent transfers={transfers} lines={lines} />;
}
