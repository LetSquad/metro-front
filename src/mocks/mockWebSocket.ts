import { WebSocketDataTypeEnum } from "@models/websocket/enums";
import { WebSocketRequestData } from "@models/websocket/types";

export function mockWebSocket(data: WebSocketRequestData[], onMessage: (eventData: any) => void) {
    for (const _data of data) {
        switch (_data.type) {
            case WebSocketDataTypeEnum.CURRENT_ORDER_LIST_UPDATE: {
                setInterval(() => mockCurrentOrderList(onMessage), 10_000);
                break;
            }
            default: {
                break;
            }
        }
    }
}

function mockCurrentOrderList(onMessage: (eventData: any) => void) {
    onMessage({ isChanged: true });
}
