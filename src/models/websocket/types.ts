import { WebSocketDataTypeEnum, WebSocketResponseActionEnum } from "@models/websocket/enums";

export interface WebSocketRequestData {
    type: WebSocketDataTypeEnum;
    login: string;
    id?: number;
}

export interface UpdateListWebSocketRequestData extends WebSocketRequestData {
    type:
        | WebSocketDataTypeEnum.ORDERS_DISTRIBUTION_UPDATE
        | WebSocketDataTypeEnum.CURRENT_ORDER_LIST_UPDATE
        | WebSocketDataTypeEnum.ORDER_LIST_UPDATE
        | WebSocketDataTypeEnum.PASSENGER_LIST_UPDATE;
    login: string;
}

export interface EditPassengerWebSocketRequestData extends WebSocketRequestData {
    type: WebSocketDataTypeEnum.PASSENGER_EDIT;
    login: string;
    id: number;
}

export interface EditEmployeeWebSocketRequestData extends WebSocketRequestData {
    type: WebSocketDataTypeEnum.EMPLOYEE_EDIT;
    login: string;
    id: number;
}

export interface EditOrderWebSocketRequestData extends WebSocketRequestData {
    type: WebSocketDataTypeEnum.ORDER_EDIT;
    login: string;
    id: number;
}

export interface UpdateListWebSocketResponseData {
    type:
        | WebSocketDataTypeEnum.ORDERS_DISTRIBUTION_UPDATE
        | WebSocketDataTypeEnum.CURRENT_ORDER_LIST_UPDATE
        | WebSocketDataTypeEnum.ORDER_LIST_UPDATE
        | WebSocketDataTypeEnum.PASSENGER_LIST_UPDATE;
    id: number;
}

export interface WebSocketResponse {
    action: WebSocketResponseActionEnum;
}

export interface UpdateListWebSocketResponse {
    action: WebSocketResponseActionEnum.UPDATE;
    data: UpdateListWebSocketResponseData;
}

export interface PongLWebSocketResponse {
    action: WebSocketResponseActionEnum.PONG;
}

export interface EditWebSocketResponse {
    action: WebSocketResponseActionEnum.ERROR;
}
