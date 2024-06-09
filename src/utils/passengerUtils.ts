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
