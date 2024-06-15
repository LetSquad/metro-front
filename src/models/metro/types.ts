export interface MetroLine {
    id: number;
    name: string;
    color: string;
}

export interface Station {
    id: number;
    line: MetroLine;
    name: string;
}

export interface StationTransfer {
    startStation: Station;
    finishStation: Station;
    duration: number;
    isCrosswalking: boolean;
}

export interface StationTransferFormValues {
    startStation: number;
    finishStation: number;
    duration: number;
    isCrosswalking: boolean;
}
