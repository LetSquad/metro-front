import { WebSocketDataTypeEnum, WebSocketResponseActionEnum } from "@models/websocket/enums";
import { WebSocketRequestData, WebSocketResponse } from "@models/websocket/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function mockWebSocket(data: WebSocketRequestData, onMessage: (eventData: WebSocketResponse) => void) {
    switch (data.type) {
        case WebSocketDataTypeEnum.CURRENT_ORDER_LIST_UPDATE: {
            // setInterval(() => mockCurrentOrderList(onMessage), 10_000);
            break;
        }
        default: {
            break;
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mockCurrentOrderList(onMessage: (eventData: WebSocketResponse) => void) {
    onMessage({ action: WebSocketResponseActionEnum.UPDATE });
}
