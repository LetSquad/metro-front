import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faBusinessTime, faSquareXmark, faTrainSubway, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { OrderStatusCodeEnum, TimeListActionType } from "@models/order/enums";

export function getOrderStatusNameByOrderStatusCodeEnum(orderStatusCode: OrderStatusCodeEnum) {
    switch (orderStatusCode) {
        case OrderStatusCodeEnum.NOT_CONFIRMED: {
            return "Не подтверждена";
        }
        case OrderStatusCodeEnum.REVIEW: {
            return "В рассмотрении";
        }
        case OrderStatusCodeEnum.ACCEPTED: {
            return "Принята";
        }
        case OrderStatusCodeEnum.INSPECTOR_WENT: {
            return "Инспектор выехал";
        }
        case OrderStatusCodeEnum.INSPECTOR_ARRIVED: {
            return "Инспектор на месте";
        }
        case OrderStatusCodeEnum.RIDE: {
            return "Поездка";
        }
        case OrderStatusCodeEnum.COMPLETED: {
            return "Заявка закончена";
        }
        case OrderStatusCodeEnum.IDENTIFICATION: {
            return "Выявление";
        }
        case OrderStatusCodeEnum.WAITING_LIST: {
            return "Лист ожидания";
        }
        case OrderStatusCodeEnum.CANCELED: {
            return "Отмена";
        }
        case OrderStatusCodeEnum.REJECTED: {
            return "Отказ";
        }
        case OrderStatusCodeEnum.PASSENGER_LATE: {
            return "Пассажир опаздывает";
        }
        case OrderStatusCodeEnum.INSPECTOR_LATE: {
            return "Инспектор опаздывает";
        }
        // skip default
    }
}

export function getOrderTimeListActionByOrderTimeListActionEnum(orderTimeListAction: TimeListActionType) {
    switch (orderTimeListAction) {
        case TimeListActionType.TRANSFER: {
            return "В пути";
        }
        case TimeListActionType.BREAK: {
            return "Перерыв";
        }
        case TimeListActionType.DOWNTIME: {
            return "Простой";
        }
        case TimeListActionType.ORDER: {
            return "На заявке";
        }
        default: {
            return "";
        }
    }
}

export function getOrderTimeListActionIconByOrderTimeListActionEnum(orderTimeListAction: TimeListActionType): IconProp | undefined {
    switch (orderTimeListAction) {
        case TimeListActionType.TRANSFER: {
            return faTrainSubway;
        }
        case TimeListActionType.BREAK: {
            return faUtensils;
        }
        case TimeListActionType.DOWNTIME: {
            return faSquareXmark;
        }
        case TimeListActionType.ORDER: {
            return faBusinessTime;
        }
        default: {
            return undefined;
        }
    }
}
