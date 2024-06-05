import { DateTime } from "luxon";

export function getFullName(firstName?: string | null, middleName?: string | null, lastName?: string | null): string {
    return `${lastName || ""}${lastName && (firstName || middleName) ? " " : ""}${firstName || ""}${
        firstName && middleName ? " " : ""
    }${middleName || ""}`;
}

export function equalNumberWithStringOrNumber(arg1?: number, arg2?: string | number): boolean {
    if (arg2 === undefined || arg1 === undefined) {
        return false;
    }

    if (typeof arg2 === "number") {
        return arg1 === arg2;
    }

    return arg1 === Number.parseInt(arg2, 10);
}

export function containsStringOrNumberInNumberArray(arg1: number[], arg2?: string | number): boolean {
    if (arg2 === undefined) {
        return false;
    }

    if (typeof arg2 === "number") {
        return arg1.includes(arg2);
    }

    return arg1.includes(Number.parseInt(arg2, 10));
}

export function capitalizeFirstLetter([first, ...rest]: string) {
    return first.toUpperCase() + rest.join("");
}

export function isSameDate(firstDay: DateTime, secondDay: DateTime) {
    return firstDay.day === secondDay.day && firstDay.month === secondDay.month && firstDay.year === secondDay.year;
}

export function isSameWeek(firstDay: DateTime, secondDay: DateTime) {
    return firstDay.year === secondDay.year && firstDay.weekNumber === secondDay.weekNumber;
}

export function isSameMonth(firstDay: DateTime, secondDay: DateTime) {
    return firstDay.month === secondDay.month;
}

export function getFormatTimeInterval(firstDate: string, secondDate: string): string;
export function getFormatTimeInterval(firstDate: DateTime, secondDate: DateTime): string;
export function getFormatTimeInterval(firstDate: string | DateTime, secondDate: string | DateTime): string {
    const formatFirstDate = typeof firstDate === "string" ? DateTime.fromISO(firstDate) : firstDate;
    const formatSecondDate = typeof secondDate === "string" ? DateTime.fromISO(secondDate) : secondDate;

    return `${formatFirstDate.toFormat("T")}-${formatSecondDate.toFormat("T")}`;
}

export function parseParams(params: Record<string, any>) {
    const keys = Object.keys(params);
    let options = "";

    for (const key of keys) {
        const isParamTypeUndefined = params[key] === undefined || params[key] === null;
        const isParamTypeObject = typeof params[key] === "object";
        const isParamTypeArray = isParamTypeObject && params[key].length >= 0;

        if (!isParamTypeObject && !isParamTypeUndefined) {
            options += `${key}=${params[key]}&`;
        }

        if (isParamTypeObject && isParamTypeArray) {
            for (const element of params[key]) {
                options += `${key}=${element}&`;
            }
        }
    }

    return options ? options.slice(0, -1) : options;
}

export function getFullExternalLink(link: string) {
    if (link.startsWith("http")) {
        return link;
    }

    return `https://${link}`;
}
