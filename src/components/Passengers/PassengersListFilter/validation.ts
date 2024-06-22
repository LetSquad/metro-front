import * as yup from "yup";

import { PHONE_REG_EXP } from "@coreUtils/constants";
import { PassengersFiltersFieldsName } from "@models/passenger/enums";

const PHONE_INVALID_MESSAGE = "Введите корректный номер телефона";

export const validationSchema = yup.object().shape({
    [PassengersFiltersFieldsName.PHONE]: yup.string().matches(PHONE_REG_EXP, PHONE_INVALID_MESSAGE).optional()
});
