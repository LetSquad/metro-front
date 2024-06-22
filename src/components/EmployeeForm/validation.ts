import * as yup from "yup";

import { EmployeeFieldsName } from "@models/employee/enums";

const FIRST_NAME_REQUIRED_MESSAGE = "Фамилия пассажира должна быть указано";

const LAST_NAME_REQUIRED_MESSAGE = "Имя пассажира должно быть указано";

const SEX_REQUIRED_MESSAGE = "Пол пассажира должен быть указан";

const RANK_REQUIRED_MESSAGE = "Должность сотрудника должна быть указано";

const PHONE_REQUIRED_MESSAGE = "Рабочий телефон должен быть указан";

const SHIFT_REQUIRED_MESSAGE = "Рабочий режим должен быть указан";

const EMPLOYEE_NUMBER_REQUIRED_MESSAGE = "Табельный номер должен быть указан и состоять только из цифр";

export const validationSchema = yup.object().shape({
    [EmployeeFieldsName.FIRST_NAME]: yup.string().required(FIRST_NAME_REQUIRED_MESSAGE),
    [EmployeeFieldsName.LAST_NAME]: yup.string().required(LAST_NAME_REQUIRED_MESSAGE),
    [EmployeeFieldsName.SEX]: yup.string().required(SEX_REQUIRED_MESSAGE),
    [EmployeeFieldsName.SHIFT]: yup.string().required(SHIFT_REQUIRED_MESSAGE),
    [EmployeeFieldsName.WORK_PHONE]: yup.string().required(PHONE_REQUIRED_MESSAGE),
    [EmployeeFieldsName.RANK]: yup.string().required(RANK_REQUIRED_MESSAGE),
    [EmployeeFieldsName.EMPLOYEE_NUMBER]: yup.number().required(EMPLOYEE_NUMBER_REQUIRED_MESSAGE)
});
