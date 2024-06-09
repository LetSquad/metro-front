import * as yup from "yup";

import { PHONE_REG_EXP } from "@coreUtils/constants";
import { SignInFieldName } from "@models/auth/enums";

const PHONE_INVALID_MESSAGE = "Введите корректный номер телефона";
const PHONE_REQUIRED_MESSAGE = "Необходимо ввести номер телефона";

export const validationSchema = yup.object().shape({
    [SignInFieldName.PHONE]: yup.string().required(PHONE_REQUIRED_MESSAGE).matches(PHONE_REG_EXP, PHONE_INVALID_MESSAGE)
});
