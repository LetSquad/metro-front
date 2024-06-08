import { Sex } from "@models/common/enums";
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

export interface Passenger {
    id: number;
    firstName: string;
    lastName: string;
    middleName?: string | null;
    sex: Sex;
    comment?: string | null;
    hasPacemaker: boolean;
    category: PassengerCategory;
}
