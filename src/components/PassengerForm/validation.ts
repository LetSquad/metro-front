import * as yup from "yup";

import { PHONE_REG_EXP } from "@coreUtils/constants";
import { PassengerFieldsName } from "@models/passenger/enums";

const FIRST_NAME_REQUIRED_MESSAGE = "Фамилия пассажира должна быть указано";

const LAST_NAME_REQUIRED_MESSAGE = "Имя пассажира должно быть указано";

const SEX_REQUIRED_MESSAGE = "Пол пассажира должен быть указан";

const CATEGORY_REQUIRED_MESSAGE = "Категория пассажира должна быть указано";

const PHONE_REQUIRED_MESSAGE = "Должен быть указан хотя бы один телефон";
const PHONE_INVALID_MESSAGE = "Укажите корректный номер телефона";

export const validationSchema = yup.object().shape({
    [PassengerFieldsName.FIRST_NAME]: yup.string().required(FIRST_NAME_REQUIRED_MESSAGE),
    [PassengerFieldsName.LAST_NAME]: yup.string().required(LAST_NAME_REQUIRED_MESSAGE),
    [PassengerFieldsName.SEX]: yup.string().required(SEX_REQUIRED_MESSAGE),
    [PassengerFieldsName.CATEGORY]: yup.string().required(CATEGORY_REQUIRED_MESSAGE),
    [PassengerFieldsName.PHONES]: yup
        .array()
        .of(
            yup.object().shape({
                phone: yup.string().matches(PHONE_REG_EXP, PHONE_INVALID_MESSAGE).required(PHONE_REQUIRED_MESSAGE)
            })
        )
        .min(1, PHONE_REQUIRED_MESSAGE)
});
