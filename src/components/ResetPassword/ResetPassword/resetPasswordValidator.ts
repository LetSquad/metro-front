import * as yup from "yup";

import { ResetPasswordFieldName } from "@models/auth/enums";

const AMOUNT_OF_PASSWORD_CHARACTERS = {
    min: 8,
    max: 16
};

const PASSWORD_INVALID_MESSAGE =
    "Длина пароля должна быть от 8 символов и включать одну заглавную букву, одну строчную букву, один спецсимвол, и одну цифру";
const PASSWORD_REQUIRED_MESSAGE = "Необходимо ввести пароль";

const CONFIRM_PASSWORD_INVALID_MESSAGE = "Пароли должны совпадать";

export const validationSchema = yup
    .object()
    .shape({
        [ResetPasswordFieldName.PASSWORD]: yup
            .string()
            .min(AMOUNT_OF_PASSWORD_CHARACTERS.min, PASSWORD_INVALID_MESSAGE)
            .required(PASSWORD_REQUIRED_MESSAGE)
            .matches(/^(?=.*[A-Za-z])(?=.*\d)[\d!#$%&*?@A-Za-z]{6,100}$/, PASSWORD_INVALID_MESSAGE)
    })
    .shape({
        [ResetPasswordFieldName.PASSWORD_CONFIRM]: yup
            .string()
            .oneOf([yup.ref(ResetPasswordFieldName.PASSWORD), undefined], CONFIRM_PASSWORD_INVALID_MESSAGE)
    });
