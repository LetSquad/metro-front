import { Employee } from "@models/employee/types";
import { BasePageResponse, ResponseWithEditLock } from "@models/http/types";
import { Station, StationTransfer, StationTransferFormValues } from "@models/metro/types";
import {
    OrderApplicationCodeEnum,
    OrderFieldsName,
    OrdersFiltersFieldsName,
    OrderStatusCodeEnum,
    TimeListActionType
} from "@models/order/enums";
import { PassengerCategoryCodeEnum } from "@models/passenger/enums";
import { Baggage, Passenger, PassengerCategory } from "@models/passenger/types";

export interface OrderApplication {
    code: OrderApplicationCodeEnum;
    name: string;
}

export interface OrderStatus {
    code: OrderStatusCodeEnum;
    name: string;
}

export interface Order {
    id: number;
    [OrderFieldsName.START_DESCRIPTION]?: string | null;
    [OrderFieldsName.FINISH_DESCRIPTION]?: string | null;
    [OrderFieldsName.ORDER_APPLICATION]?: OrderApplication | null;
    duration: number; // In seconds
    [OrderFieldsName.PASSENGER_COUNT]: number;
    [OrderFieldsName.MALE_EMPLOYEE_COUNT]: number;
    [OrderFieldsName.FEMALE_EMPLOYEE_COUNT]: number;
    [OrderFieldsName.ADDITIONAL_INFO]?: string | null;
    createdTime?: string | null;
    [OrderFieldsName.ORDER_TIME]: string;
    startTime?: string | null;
    finishTime?: string | null;
    absenceTime?: string | null;
    cancelTime?: string | null;
    orderStatus: OrderStatus;
    employees?: Employee[] | null;
    [OrderFieldsName.PASSENGER]: Passenger;
    [OrderFieldsName.BAGGAGE]?: Baggage | null;
    [OrderFieldsName.TRANSFERS]?: StationTransfer[] | null;
    [OrderFieldsName.PASSENGER_CATEGORY]?: PassengerCategory | null;
    [OrderFieldsName.START_STATION]: Station;
    [OrderFieldsName.FINISH_STATION]: Station;
}

export interface OrdersTimeList {
    employee: Employee;
    actions: {
        timeStart: string;
        timeEnd: string;
        order?: Order | null;
        actionType: TimeListActionType;
    }[];
}

export interface OrderCalculation {
    transfers: StationTransfer[];
    duration: number;
}

export interface OrdersFiltersFormValues {
    [OrdersFiltersFieldsName.PASSENGER_FIRST_NAME]?: string;
    [OrdersFiltersFieldsName.PASSENGER_LAST_NAME]?: string;
    [OrdersFiltersFieldsName.PASSENGER_PHONE]?: string;
    [OrdersFiltersFieldsName.EMPLOYEE_FIRST_NAME]?: string;
    [OrdersFiltersFieldsName.EMPLOYEE_LAST_NAME]?: string;
    [OrdersFiltersFieldsName.EMPLOYEE_PHONE]?: string;
    [OrdersFiltersFieldsName.ORDER_CATEGORIES]?: string[];
    [OrdersFiltersFieldsName.ORDER_STATUSES]?: string[];
    [OrdersFiltersFieldsName.DATE_FROM]: string;
    [OrdersFiltersFieldsName.DATE_TO]: string;
}

export interface OrderCalculationFormValues {
    [OrderFieldsName.START_DESCRIPTION]?: string;
    [OrderFieldsName.FINISH_DESCRIPTION]?: string;
    [OrderFieldsName.ORDER_APPLICATION]: OrderApplicationCodeEnum;
    [OrderFieldsName.PASSENGER_COUNT]: number;
    [OrderFieldsName.ADDITIONAL_INFO]?: string;
    [OrderFieldsName.ORDER_TIME]: string;
    [OrderFieldsName.PASSENGER]: number;
    [OrderFieldsName.EMPLOYEES]?: number[];
    [OrderFieldsName.MALE_EMPLOYEE_COUNT]: number;
    [OrderFieldsName.FEMALE_EMPLOYEE_COUNT]: number;
    [OrderFieldsName.BAGGAGE]?: Partial<Baggage>;
    [OrderFieldsName.PASSENGER_CATEGORY]?: PassengerCategoryCodeEnum;
    [OrderFieldsName.START_STATION]: number;
    [OrderFieldsName.FINISH_STATION]: number;
}

export interface OrderFormValues {
    [OrderFieldsName.START_DESCRIPTION]?: string;
    [OrderFieldsName.FINISH_DESCRIPTION]?: string;
    [OrderFieldsName.ORDER_APPLICATION]: OrderApplicationCodeEnum;
    [OrderFieldsName.PASSENGER_COUNT]: number;
    [OrderFieldsName.ADDITIONAL_INFO]?: string;
    [OrderFieldsName.ORDER_TIME]: string;
    [OrderFieldsName.PASSENGER]: number;
    [OrderFieldsName.MALE_EMPLOYEE_COUNT]: number;
    [OrderFieldsName.FEMALE_EMPLOYEE_COUNT]: number;
    [OrderFieldsName.BAGGAGE]?: Partial<Baggage>;
    [OrderFieldsName.PASSENGER_CATEGORY]?: PassengerCategoryCodeEnum;
    [OrderFieldsName.START_STATION]: number;
    [OrderFieldsName.FINISH_STATION]: number;
    [OrderFieldsName.TRANSFERS]: StationTransferFormValues[];
    [OrderFieldsName.EMPLOYEES]?: number[];
}

export interface OrderFormRef {
    resetForm: () => void;
}

export type OrderResponse = Order;
export type OrderWithLockResponse = ResponseWithEditLock<Order>;
export type OrderCalculationResponse = OrderCalculation;
export type OrdersResponse = BasePageResponse<Order>;
export type OrdersTimeListResponse = BasePageResponse<OrdersTimeList>;
