import { useCallback, useEffect, useRef, useState } from "react";

import apiUrls from "@api/apiUrls";
import { useToggle } from "@hooks/useToogle";
import { WebSocketRequestActionEnum } from "@models/websocket/enums";
import { WebSocketRequestData, WebSocketResponse } from "@models/websocket/types";

import { mockWebSocket } from "../../mocks/mockWebSocket";

export default function useWebsocket<T extends WebSocketRequestData>(
    data: T,
    onMessage: (eventData: WebSocketResponse) => void,
    onError?: (errorEvent: Event) => void,
    autoStart: boolean = false
) {
    const [socket, setSocket] = useState<WebSocket>();
    const [updatedAt, setUpdatedAt] = useState(Date.now());
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
    const [isReconnect, , setReconnectTrue, setReconnectFalse] = useToggle();

    const socketRef = useRef(socket);
    const intervalIdRef = useRef(intervalId);
    const updatedAtRef = useRef(updatedAt);

    const healthcheck = useCallback(() => {
        const _socket = socketRef.current;
        const _updatedAt = updatedAtRef.current;
        if (!_socket) {
            return;
        }

        if (_socket.readyState !== 1) {
            return;
        }

        if (Date.now() - _updatedAt > 5000) {
            _socket.send(JSON.stringify({ action: WebSocketRequestActionEnum.PING }));
        }
    }, []);

    const onOpenSocketHandler = useCallback(
        (_socket: WebSocket) => {
            _socket?.send(JSON.stringify({ action: WebSocketRequestActionEnum.INIT }));
            _socket?.send(JSON.stringify({ action: WebSocketRequestActionEnum.WANT, data }));
        },
        [data]
    );

    const onCloseSocketWithReconnectHandler = useCallback(
        (event: CloseEvent) => {
            const _socket = socketRef.current;
            const _intervalId = intervalIdRef.current;

            if (_socket && event.code !== 1000) {
                if (_intervalId) {
                    clearInterval(_intervalId);
                }

                setIntervalId(undefined);
                setSocket(undefined);

                setTimeout(() => {
                    setReconnectTrue();
                }, 1000);
            } else {
                if (_intervalId) {
                    clearInterval(_intervalId);
                }

                setIntervalId(undefined);
                setSocket(undefined);
            }
        },
        [setReconnectTrue]
    );

    const onErrorSocketHandler = useCallback(
        (errorEvent: Event) => {
            const _socket = socketRef.current;
            if (onError) {
                onError(errorEvent);
            }
            _socket?.close(3000, "Restart socket after error");
        },
        [onError]
    );

    const connectSocket = useCallback(() => {
        if (process.env.WITH_MOCK) {
            mockWebSocket(data, onMessage);
        } else {
            const _socket = new WebSocket(apiUrls.websocket());
            setSocket(_socket);
            setUpdatedAt(Date.now());

            _socket.addEventListener("open", () => onOpenSocketHandler(_socket));

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
        intervalIdRef.current = intervalId;
    }, [intervalId]);

    useEffect(() => {
        updatedAtRef.current = updatedAt;
    }, [updatedAt]);

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
