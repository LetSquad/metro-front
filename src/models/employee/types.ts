import { Sex } from "@models/common/enums";
import { EmployeeFieldsName, EmployeeRole, RankFieldsName } from "@models/employee/enums";
import { ResponseWithEditLock } from "@models/http/types";

export interface EmployeeRank {
    code: string;
    name: string;
    shortName?: string | null;
}

export interface Employee {
    id: number;
    login: string;
    [EmployeeFieldsName.EMPLOYEE_ROLE]: EmployeeRole;
    [EmployeeFieldsName.WORK_PHONE]: string;
    [EmployeeFieldsName.PERSONAL_PHONE]: string;
    [EmployeeFieldsName.FIRST_NAME]: string;
    [EmployeeFieldsName.LAST_NAME]: string;
    [EmployeeFieldsName.MIDDLE_NAME]?: string | null;
    [EmployeeFieldsName.SEX]: Sex;
    [EmployeeFieldsName.SHIFT]: string;
    [EmployeeFieldsName.EMPLOYEE_NUMBER]: number;
    [EmployeeFieldsName.LIGHT_DUTIES]: boolean;
    rank: EmployeeRank;
}

export interface EmployCurrent extends Employee {
    login: string;
}

export type EmployeeFormFields = Omit<Employee, "id" | "rank"> & { [RankFieldsName.RANK_CODE]: string };

export type EmployeeResponse = ResponseWithEditLock<Employee>;
export type EmployeeCurrentResponse = EmployCurrent;
export type EmployeesResponse = { employees: Employee[] };
