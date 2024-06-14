import { useCallback, useEffect, useRef, useState } from "react";

import apiUrls from "@api/apiUrls";
import { useToggle } from "@hooks/useToogle";
import { WebSocketRequestActionEnum } from "@models/websocket/enums";
import { WebSocketRequestData, WebSocketResponse } from "@models/websocket/types";

import { mockWebSocket } from "../../mocks/mockWebSocket";

export default function useWebsocket<T extends WebSocketRequestData>(
    data: T[],
    onMessage: (eventData: WebSocketResponse) => void,
    onError?: (errorEvent: Event) => void,
    autoStart: boolean = false
) {
    const [socket, setSocket] = useState<WebSocket>();
    const [updatedAt, setUpdatedAt] = useState(Date.now());
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
    const [isReconnect, , setReconnectTrue, setReconnectFalse] = useToggle();

    const socketRef = useRef(socket);

    const healthcheck = useCallback(() => {
        if (!socket) {
            return;
        }

        if (socket.readyState !== 1) {
            return;
        }

        if (Date.now() - updatedAt > 5000) {
            socket.send(JSON.stringify({ action: WebSocketRequestActionEnum.PING }));
        }
    }, [updatedAt, socket]);

    const onOpenSocketHandler = useCallback(() => {
        socket?.send(JSON.stringify({ action: WebSocketRequestActionEnum.INIT }));
        socket?.send(JSON.stringify({ action: WebSocketRequestActionEnum.WANT, data }));
    }, [data, socket]);

    const onCloseSocketWithReconnectHandler = useCallback(
        (event: CloseEvent) => {
            if (socket && event.code !== 1000) {
                if (intervalId) {
                    clearInterval(intervalId);
                }

                setIntervalId(undefined);
                setSocket(undefined);

                setTimeout(() => {
                    setReconnectTrue();
                }, 1000);
            } else {
                if (intervalId) {
                    clearInterval(intervalId);
                }

                setIntervalId(undefined);
                setSocket(undefined);
            }
        },
        [intervalId, setReconnectTrue, socket]
    );

    const onErrorSocketHandler = useCallback(
        (errorEvent: Event) => {
            if (onError) {
                onError(errorEvent);
            }
            socket?.close(3000, "Restart socket after error");
        },
        [onError, socket]
    );

    const connectSocket = useCallback(() => {
        if (process.env.WITH_MOCK) {
            mockWebSocket(data, onMessage);
        } else {
            const _socket = new WebSocket(apiUrls.websocket());
            setSocket(_socket);
            setUpdatedAt(Date.now());

            _socket.addEventListener("open", onOpenSocketHandler);

            _socket.addEventListener("message", (event) => {
                setUpdatedAt(Date.now());
                const eventData = JSON.parse(event.data) as WebSocketResponse;
                onMessage(eventData);
            });

            _socket.addEventListener("close", onCloseSocketWithReconnectHandler);

            _socket.addEventListener("error", onErrorSocketHandler);

            setIntervalId(setInterval(healthcheck, 1000));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, healthcheck, onCloseSocketWithReconnectHandler, onErrorSocketHandler, onMessage, onOpenSocketHandler, socket]);

    const closeSocket = useCallback(
        (_socket?: WebSocket) => {
            (_socket ?? socket)?.close(1000);
        },
        [socket]
    );

    const reconnectSocket = useCallback(() => {
        if (socket) {
            socket.close(1001, "Reconnect");
        } else {
            connectSocket();
        }
    }, [connectSocket, socket]);

    const startSocket = useCallback(() => {
        if (!socket) {
            connectSocket();
        }
    }, [connectSocket, socket]);

    useEffect(() => {
        socketRef.current = socket;
    }, [socket]);

    useEffect(() => {
        if (autoStart) {
            startSocket();
        }

        return () => {
            closeSocket(socketRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isReconnect && socket) {
            startSocket();
            setReconnectFalse();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReconnect, socket]);

    return { socket, startSocket, reconnectSocket, closeSocket };
}
