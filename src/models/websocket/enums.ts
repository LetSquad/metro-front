export enum WebSocketRequestActionEnum {
    PING = "ping",
    WANT = "want",
    INIT = "init"
}

export enum WebSocketResponseActionEnum {
    PONG = "pong",
    ERROR = "error",
    UPDATE = "update"
}

export enum WebSocketDataTypeEnum {
    ORDER_EDIT = "ORDER_EDIT",
    EMPLOYEE_EDIT = "EMPLOYEE_EDIT",
    PASSENGER_EDIT = "PASSENGER_EDIT",
    ORDER_LIST_UPDATE = "ORDER_LIST_UPDATE",
    CURRENT_ORDER_LIST_UPDATE = "CURRENT_ORDER_LIST_UPDATE",
    ORDERS_DISTRIBUTION_UPDATE = "ORDERS_DISTRIBUTION_UPDATE",
    PASSENGER_LIST_UPDATE = "PASSENGER_LIST_UPDATE"
}
