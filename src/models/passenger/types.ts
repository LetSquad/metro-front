import { Sex } from "@models/common/enums";
import { BasePageResponse, ResponseWithEditLock } from "@models/http/types";
import { PassengerCategoryCodeEnum } from "@models/passenger/enums";

export interface Baggage {
    type: string;
    weight: number;
    isHelpNeeded: boolean;
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
    firstName: string;
    lastName: string;
    middleName?: string | null;
    sex: Sex;
    comment?: string | null;
    hasPacemaker: boolean;
    category: PassengerCategory;
    phones: PassengerPhone[];
}

export type PassengerResponse = ResponseWithEditLock<Passenger>;
export type PassengersResponse = BasePageResponse<Passenger[]>;
