export interface MetroLine {
    id: number;
    name: number;
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
