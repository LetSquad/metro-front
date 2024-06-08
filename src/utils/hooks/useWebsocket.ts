import { useCallback, useEffect, useState } from "react";

import apiUrls from "@api/apiUrls";
import { useToggle } from "@hooks/useToogle";
import { WebSocketData } from "@models/websocket/types";

export default function useWebsocket(
    data: WebSocketData[],
    onMessage: (eventData: any) => void,
    onError?: (errorEvent: Event) => void,
    autoStart: boolean = false
) {
    const [socket, setSocket] = useState<WebSocket>();
    const [updatedAt, setUpdatedAt] = useState(Date.now());
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
    const [isReconect, , setReconnectTrue, setReconnectFalse] = useToggle();

    const healthcheck = useCallback(() => {
        if (!socket) {
            return;
        }

        if (socket.readyState !== 1) {
            return;
        }

        if (Date.now() - updatedAt > 5000) {
            socket.send(JSON.stringify({ action: "ping" }));
        }
    }, [socket, updatedAt]);

    const onOpenSocketHandler = useCallback(() => {
        socket?.send(JSON.stringify({ action: "init" }));
        socket?.send(JSON.stringify({ action: "want", data }));
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
        if (!process.env.WITH_MOCK) {
            const _socket = new WebSocket(apiUrls.websocket());
            setSocket(_socket);
            setUpdatedAt(Date.now());

            _socket.addEventListener("open", onOpenSocketHandler);

            _socket.addEventListener("message", (event) => {
                setUpdatedAt(Date.now());
                const eventData = JSON.parse(event.data);
                onMessage(eventData);
            });

            _socket.addEventListener("close", (event) => onCloseSocketWithReconnectHandler(event));

            _socket.addEventListener("error", onErrorSocketHandler);

            setIntervalId(setInterval(healthcheck, 1000));
        }
    }, [healthcheck, onCloseSocketWithReconnectHandler, onErrorSocketHandler, onMessage, onOpenSocketHandler]);

    const closeSocket = useCallback(() => {
        socket?.close(1000);
    }, [socket]);

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
        if (autoStart) {
            startSocket();
        }

        return () => {
            closeSocket();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isReconect) {
            startSocket();
            setReconnectFalse();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReconect]);

    return { socket, startSocket, reconnectSocket, closeSocket };
}
