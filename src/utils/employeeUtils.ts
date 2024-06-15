import { Sex } from "@models/common/enums";

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

export const formatEmployeeCount = (employeeCount: number, sex: Sex) => {
    const rule = ruRules.select(employeeCount);
    const suffixes = sex === Sex.MALE ? maleEmployeeSuffixes : femaleEmployeeSuffixes;

    return `${employeeCount} ${suffixes.get(rule)}`;
};
