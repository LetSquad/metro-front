import { Station, StationTransfer } from "@models/metro/types";
import { OrderApplicationCodeEnum, OrderStatusCodeEnum } from "@models/order/enums";
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
    cancel_time?: string | null;
    orderStatus: OrderStatus;
    passenger: Passenger;
    baggage?: Baggage | null;
    transfers: StationTransfer[];
    passengerCategory?: PassengerCategory | null;
    startStation: Station;
    finishStation: Station;
}

export type OrderResponse = Order;
export type OrdersResponse = { orders: Order[] };
