import { WebSocketDataTypeEnum } from "@models/websocket/enums";

export interface WebSocketData {
    type: WebSocketDataTypeEnum;
    login: number;
}
