import { Sex } from "@models/common/enums";
import { EmployeeRankCodeEnum } from "@models/employee/enums";

export const EMPLOYEE_TIME_SHIFT = [
    "07:00-19:00",
    "08:00-20:00",
    "09:00-21:00",
    "11:00-21:00",
    "19:00-07:00",
    "20:00-08:00",
    "21:00-09:00"
];

const ruRules = new Intl.PluralRules("ru-RU");

const maleEmployeeSuffixes = new Map([
    ["one", "мужчина"],
    ["few", "мужчины"],
    ["many", "мужчин"]
]);

const femaleEmployeeSuffixes = new Map([
    ["one", "женщина"],
    ["few", "женщины"],
    ["many", "женщин"]
]);

export function formatEmployeeCount(employeeCount: number, sex: Sex) {
    const rule = ruRules.select(employeeCount);
    const suffixes = sex === Sex.MALE ? maleEmployeeSuffixes : femaleEmployeeSuffixes;

    return `${employeeCount} ${suffixes.get(rule)}`;
}

export function getEmployeeRankShortNameByEmployeeRankCodeEnum(employeeRankCode: EmployeeRankCodeEnum) {
    switch (employeeRankCode) {
        case EmployeeRankCodeEnum.CHIEF_INSPECTOR: {
            return "ЦСИ";
        }
        case EmployeeRankCodeEnum.INSPECTOR: {
            return "ЦИ";
        }
        case EmployeeRankCodeEnum.OPERATOR: {
            return "ЦИО";
        }
        case EmployeeRankCodeEnum.SECTION_FOREMAN: {
            return "ЦУ";
        }
        default: {
            return undefined;
        }
    }
}

export function getEmployeeRankNameByEmployeeRankCodeEnum(employeeRankCode: EmployeeRankCodeEnum) {
    switch (employeeRankCode) {
        case EmployeeRankCodeEnum.CHIEF_INSPECTOR: {
            return "Старший инспектор";
        }
        case EmployeeRankCodeEnum.INSPECTOR: {
            return "Инспектор";
        }
        case EmployeeRankCodeEnum.OPERATOR: {
            return "Оператор";
        }
        case EmployeeRankCodeEnum.SECTION_FOREMAN: {
            return "Начальник участка";
        }
        case EmployeeRankCodeEnum.SPECIALIST: {
            return "Специалист";
        }
        case EmployeeRankCodeEnum.ADMINISTRATOR: {
            return "Администратор";
        }
        // skip default
    }
}
