import { DateTime } from "luxon";
import * as yup from "yup";

import { PHONE_REG_EXP } from "@coreUtils/constants";
import { OrdersFiltersFieldsName } from "@models/order/enums";

const PHONE_INVALID_MESSAGE = "Введите корректный номер телефона";

const DATE_TO_LOWER_THEN_FROM_MESSAGE = `Дата "до" должна быть больше или равна дате "с"`;

export const validationSchema = yup.object().shape({
    [OrdersFiltersFieldsName.PASSENGER_PHONE]: yup.string().matches(PHONE_REG_EXP, PHONE_INVALID_MESSAGE).optional(),
    [OrdersFiltersFieldsName.EMPLOYEE_PHONE]: yup.string().matches(PHONE_REG_EXP, PHONE_INVALID_MESSAGE).optional(),
    [OrdersFiltersFieldsName.DATE_TO]: yup
        .string()
        .test("isDateToCorrect", DATE_TO_LOWER_THEN_FROM_MESSAGE, (dateTo, testContext) => {
            const { dateFrom } = testContext.parent;

            if (dateTo === undefined || dateFrom === undefined) {
                return true;
            }

            return DateTime.fromISO(dateFrom) <= DateTime.fromISO(dateTo);
        })
        .optional()
});
