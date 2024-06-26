import { DateTime } from "luxon";

import { Sex } from "@models/common/enums";

export function getFullName(firstName?: string | null, middleName?: string | null, lastName?: string | null): string {
    return `${lastName || ""}${lastName && (firstName || middleName) ? " " : ""}${firstName || ""}${
        firstName && middleName ? " " : ""
    }${middleName || ""}`;
}

export function getShortName(lastName: string, firstName: string, middleName?: string | null): string {
    return `${lastName} ${getFirstCapitalizeNameLetter(firstName)}${middleName ? " " : ""}${middleName ? `${getFirstCapitalizeNameLetter(middleName)}` : ""}`;
}

export function capitalizeFirstLetter([first, ...rest]: string) {
    return first.toUpperCase() + rest.join("");
}

export function getFirstCapitalizeNameLetter([first]: string) {
    return `${first.toUpperCase()}.`;
}

export function isSameDate(firstDay: DateTime, secondDay: DateTime) {
    return firstDay.day === secondDay.day && firstDay.month === secondDay.month && firstDay.year === secondDay.year;
}

export function formatPhoneNumber(unformattedPhone: string): string {
    return `+${unformattedPhone.slice(0, 1)} (${unformattedPhone.slice(1, 4)}) ${unformattedPhone.slice(4, 7)}-${unformattedPhone.slice(7, 9)}-${unformattedPhone.slice(9, 11)}`;
}

export function getSexLabelBySexEnum(sex: Sex): string {
    switch (sex) {
        case Sex.MALE: {
            return "Мужчина";
        }
        case Sex.FEMALE: {
            return "Женщина";
        }
        // skip default
    }
}
