import { PassengerCategoryCodeEnum } from "@models/passenger/enums";

const ruRules = new Intl.PluralRules("ru-RU");

const passengersSuffixes = new Map([
    ["one", "пассажир"],
    ["few", "пассажира"],
    ["many", "пассажиров"]
]);

export const formatPassengersCount = (passengersCount: number) => {
    const rule = ruRules.select(passengersCount);

    return `${passengersCount} ${passengersSuffixes.get(rule)}`;
};

export function getPassengerCategoryShortNameByPassengerCategoryCodeEnum(passengerCategoryCode: PassengerCategoryCodeEnum) {
    switch (passengerCategoryCode) {
        case PassengerCategoryCodeEnum.IZT: {
            return "ИЗТ";
        }
        case PassengerCategoryCodeEnum.IZ: {
            return "ИЗ";
        }
        case PassengerCategoryCodeEnum.IS: {
            return "ИС";
        }
        case PassengerCategoryCodeEnum.IK: {
            return "ИК";
        }
        case PassengerCategoryCodeEnum.IO: {
            return "ИО";
        }
        case PassengerCategoryCodeEnum.DI: {
            return "ДИ";
        }
        case PassengerCategoryCodeEnum.PL: {
            return "ПЛ";
        }
        case PassengerCategoryCodeEnum.RD: {
            return "РД";
        }
        case PassengerCategoryCodeEnum.RDK: {
            return "РДК";
        }
        case PassengerCategoryCodeEnum.OGD: {
            return "ОГД";
        }
        case PassengerCategoryCodeEnum.OV: {
            return "ОВ";
        }
        case PassengerCategoryCodeEnum.IU: {
            return "ИУ";
        }
        // skip default
    }
}

export function getPassengerCategoryFullNameByPassengerCategoryCodeEnum(passengerCategoryCode: PassengerCategoryCodeEnum) {
    switch (passengerCategoryCode) {
        case PassengerCategoryCodeEnum.IZT: {
            return "Инвалид по зрению";
        }
        case PassengerCategoryCodeEnum.IZ: {
            return "Инвалид по зрению с остаточным зрением";
        }
        case PassengerCategoryCodeEnum.IS: {
            return "Инвалид по слуху";
        }
        case PassengerCategoryCodeEnum.IK: {
            return "Инвалид колясочник";
        }
        case PassengerCategoryCodeEnum.IO: {
            return "Инвалид опорник";
        }
        case PassengerCategoryCodeEnum.DI: {
            return "Ребенок инвалид";
        }
        case PassengerCategoryCodeEnum.PL: {
            return "Пожилой человек";
        }
        case PassengerCategoryCodeEnum.RD: {
            return "Родители с детьми";
        }
        case PassengerCategoryCodeEnum.RDK: {
            return "Родители с детскими колясками";
        }
        case PassengerCategoryCodeEnum.OGD: {
            return "Организованные группы детей";
        }
        case PassengerCategoryCodeEnum.OV: {
            return "Временно маломобильные";
        }
        case PassengerCategoryCodeEnum.IU: {
            return "Люди с ментальной инвалидностью";
        }
        // skip default
    }
}
