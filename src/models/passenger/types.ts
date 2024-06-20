import { Sex } from "@models/common/enums";
import { BasePageResponse, ResponseWithEditLock } from "@models/http/types";
import {
    BaggageFieldsName,
    PassengerCategoryCodeEnum,
    PassengerFieldsName,
    PassengersFiltersFieldsName
} from "@models/passenger/enums";

export interface Baggage {
    [BaggageFieldsName.TYPE]: string;
    [BaggageFieldsName.WEIGHT]: number;
    [BaggageFieldsName.IS_HELP_NEEDED]: boolean;
}

export interface PassengerCategory {
    code: PassengerCategoryCodeEnum;
    name: string;
    shortName: string;
}

export interface PassengerPhone {
    phone: string;
    description?: string | null;
}

export interface Passenger {
    id: number;
    [PassengerFieldsName.FIRST_NAME]: string;
    [PassengerFieldsName.LAST_NAME]: string;
    [PassengerFieldsName.MIDDLE_NAME]?: string | null;
    [PassengerFieldsName.SEX]: Sex;
    [PassengerFieldsName.COMMENT]?: string | null;
    [PassengerFieldsName.HAS_PACEMAKER]: boolean;
    [PassengerFieldsName.CATEGORY]: PassengerCategory;
    [PassengerFieldsName.PHONES]?: PassengerPhone[] | null;
}

export interface PassengersFiltersFormValues {
    [PassengersFiltersFieldsName.FIRST_NAME]?: string;
    [PassengersFiltersFieldsName.LAST_NAME]?: string;
    [PassengersFiltersFieldsName.PHONE]?: string;
    [PassengersFiltersFieldsName.CATEGORIES]?: string[];
}

export interface PassengerFormValue {
    [PassengerFieldsName.FIRST_NAME]: string;
    [PassengerFieldsName.LAST_NAME]: string;
    [PassengerFieldsName.MIDDLE_NAME]?: string;
    [PassengerFieldsName.SEX]: Sex;
    [PassengerFieldsName.COMMENT]?: string;
    [PassengerFieldsName.HAS_PACEMAKER]: boolean;
    [PassengerFieldsName.CATEGORY]: PassengerCategoryCodeEnum;
    [PassengerFieldsName.PHONES]: PassengerPhone[];
}

export type PassengerResponse = Passenger;
export type PassengerWithLockResponse = ResponseWithEditLock<Passenger>;
export type PassengersResponse = BasePageResponse<Passenger>;
