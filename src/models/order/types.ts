import { Employee } from "@models/employee/types";
import { BasePageResponse, ResponseWithEditLock } from "@models/http/types";
import { Station, StationTransfer } from "@models/metro/types";
import { OrderApplicationCodeEnum, OrdersFiltersFieldsName, OrderStatusCodeEnum, TimeListActionType } from "@models/order/enums";
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
    startDescription?: string | null;
    finishDescription?: string | null;
    orderApplication: OrderApplication;
    duration: number; // In seconds
    passengerCount: number;
    maleEmployeeCount: number;
    femaleEmployeeCount: number;
    additionalInfo?: string | null;
    createdTime: string;
    orderTime: string;
    startTime?: string | null;
    finishTime?: string | null;
    absenceTime?: string | null;
    cancelTime?: string | null;
    orderStatus: OrderStatus;
    passenger: Passenger;
    baggage?: Baggage | null;
    transfers: StationTransfer[];
    passengerCategory?: PassengerCategory | null;
    startStation: Station;
    finishStation: Station;
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

export interface OrdersFiltersFormValues {
    [OrdersFiltersFieldsName.PASSENGER_FIRST_NAME]?: string;
    [OrdersFiltersFieldsName.PASSENGER_LAST_NAME]?: string;
    [OrdersFiltersFieldsName.PASSENGER_PHONE]?: string;
    [OrdersFiltersFieldsName.EMPLOYEE_FIRST_NAME]?: string;
    [OrdersFiltersFieldsName.EMPLOYEE_LAST_NAME]?: string;
    [OrdersFiltersFieldsName.EMPLOYEE_PHONE]?: string;
    [OrdersFiltersFieldsName.ORDER_CATEGORIES]?: string[];
    [OrdersFiltersFieldsName.ORDER_STATUSES]?: string[];
    [OrdersFiltersFieldsName.DATE_FROM]?: string;
    [OrdersFiltersFieldsName.DATE_TO]?: string;
}

export type OrderResponse = Order;
export type OrderWithLockResponse = ResponseWithEditLock<Order>;
export type OrdersResponse = BasePageResponse<Order>;
export type OrdersTimeListResponse = BasePageResponse<OrdersTimeList>;
