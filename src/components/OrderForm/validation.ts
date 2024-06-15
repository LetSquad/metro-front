import * as yup from "yup";

import { OrderFieldsName } from "@models/order/enums";

const ORDER_APPLICATION_REQUIRED_MESSAGE = "Способ приема заявки должен быть указан";

const PASSENGER_COUNT_REQUIRED_MESSAGE = "Количество пассажиров должно быть указано";
const PASSENGER_COUNT_INVALID_MESSAGE = "Количество пассажиров должно быть больше 0";

const ORDER_TIME_REQUIRED_MESSAGE = "Дата начала заявки должна быть указана";

const PASSENGER_REQUIRED_MESSAGE = "Пассажир должен быть указан";

const MALE_EMPLOYEE_COUNT_REQUIRED_MESSAGE = "Количество работников мужчин должно быть указан";
const MALE_EMPLOYEE_COUNT_INVALID_MESSAGE = "Количество работников мужчин должно быть больше или равно 0";

const FEMALE_EMPLOYEE_COUNT_REQUIRED_MESSAGE = "Количество работников женщин должно быть указан";
const FEMALE_EMPLOYEE_COUNT_INVALID_MESSAGE = "Количество работников женщин должно быть больше или равно 0";

const START_STATION_REQUIRED_MESSAGE = "Начальная станция должна быть указана";

const FINISH_STATION_REQUIRED_MESSAGE = "Конечная станция должна быть указана";

const TRANSFERS_START_STATION_REQUIRED_MESSAGE = "Начальная станция трансфера должна быть указана";

const TRANSFERS_FINISH_STATION_REQUIRED_MESSAGE = "Конечная станция трансфера должна быть указана";

const TRANSFERS_DURATION_REQUIRED_MESSAGE = "Продолжительность трансфера должна быть указана";
const TRANSFERS_DURATION_INVALID_MESSAGE = "Продолжительность трансфера должна быть больше нуля";

const TRANSFERS_IS_CROSSWALKING_REQUIRED_MESSAGE = "Тип трансфера должен быть указан";

export const validationSchema = yup.object().shape({
    [OrderFieldsName.ORDER_APPLICATION]: yup.string().required(ORDER_APPLICATION_REQUIRED_MESSAGE),
    [OrderFieldsName.PASSENGER_COUNT]: yup.number().min(1, PASSENGER_COUNT_INVALID_MESSAGE).required(PASSENGER_COUNT_REQUIRED_MESSAGE),
    [OrderFieldsName.ORDER_TIME]: yup.string().required(ORDER_TIME_REQUIRED_MESSAGE),
    [OrderFieldsName.PASSENGER]: yup.number().required(PASSENGER_REQUIRED_MESSAGE),
    [OrderFieldsName.MALE_EMPLOYEE_COUNT]: yup
        .number()
        .min(0, MALE_EMPLOYEE_COUNT_INVALID_MESSAGE)
        .required(MALE_EMPLOYEE_COUNT_REQUIRED_MESSAGE),
    [OrderFieldsName.FEMALE_EMPLOYEE_COUNT]: yup
        .number()
        .min(0, FEMALE_EMPLOYEE_COUNT_INVALID_MESSAGE)
        .required(FEMALE_EMPLOYEE_COUNT_REQUIRED_MESSAGE),
    [OrderFieldsName.START_STATION]: yup.number().required(START_STATION_REQUIRED_MESSAGE),
    [OrderFieldsName.FINISH_STATION]: yup.number().required(FINISH_STATION_REQUIRED_MESSAGE),
    [OrderFieldsName.TRANSFERS]: yup.array().of(
        yup.object().shape({
            startStation: yup.number().required(TRANSFERS_START_STATION_REQUIRED_MESSAGE),
            finishStation: yup.number().required(TRANSFERS_FINISH_STATION_REQUIRED_MESSAGE),
            duration: yup.number().min(1, TRANSFERS_DURATION_INVALID_MESSAGE).required(TRANSFERS_DURATION_REQUIRED_MESSAGE),
            isCrosswalking: yup.boolean().required(TRANSFERS_IS_CROSSWALKING_REQUIRED_MESSAGE)
        })
    )
});
