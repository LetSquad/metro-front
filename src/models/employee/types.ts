import { Sex } from "@models/common/enums";
import { EmployeeFieldsName, EmployeeRankCodeEnum, EmployeeRole, EmployeesFiltersFieldsName } from "@models/employee/enums";
import { BasePageResponse, ResponseWithEditLock } from "@models/http/types";

export interface EmployeeRank {
    code: EmployeeRankCodeEnum;
    name: string;
    shortName?: string | null;
}

export interface Employee {
    id: number;
    employeeRole: EmployeeRole;
    [EmployeeFieldsName.WORK_PHONE]: string;
    [EmployeeFieldsName.PERSONAL_PHONE]?: string | null;
    [EmployeeFieldsName.FIRST_NAME]: string;
    [EmployeeFieldsName.LAST_NAME]: string;
    [EmployeeFieldsName.MIDDLE_NAME]?: string | null;
    [EmployeeFieldsName.SEX]: Sex;
    [EmployeeFieldsName.SHIFT]: string;
    [EmployeeFieldsName.EMPLOYEE_NUMBER]: number;
    [EmployeeFieldsName.LIGHT_DUTIES]: boolean;
    [EmployeeFieldsName.RANK]: EmployeeRank;
}

export interface EmployeeCurrent extends Employee {
    login: string;
}

export interface NewEmployee extends EmployeeCurrent {
    password: string;
}

export interface EmployeeFormValues {
    [EmployeeFieldsName.FIRST_NAME]: string;
    [EmployeeFieldsName.LAST_NAME]: string;
    [EmployeeFieldsName.MIDDLE_NAME]?: string;
    [EmployeeFieldsName.WORK_PHONE]: string;
    [EmployeeFieldsName.PERSONAL_PHONE]?: string;
    [EmployeeFieldsName.SEX]: Sex;
    [EmployeeFieldsName.SHIFT]: string;
    [EmployeeFieldsName.EMPLOYEE_NUMBER]: number;
    [EmployeeFieldsName.LIGHT_DUTIES]: boolean;
    [EmployeeFieldsName.RANK]: EmployeeRankCodeEnum;
}

export interface EmployeesFiltersFormValues {
    [EmployeesFiltersFieldsName.FIRST_NAME]?: string;
    [EmployeesFiltersFieldsName.LAST_NAME]?: string;
    [EmployeesFiltersFieldsName.PHONE]?: string;
    [EmployeesFiltersFieldsName.LIGHT_DUTIES]?: boolean;
}

export interface EmployeeFormRef {
    resetForm: () => void;
}

export type EmployeeResponse = Employee;
export type NewEmployeeResponse = NewEmployee;
export type EmployeeWithLockResponse = ResponseWithEditLock<Employee>;
export type EmployeeCurrentResponse = EmployeeCurrent;
export type EmployeesResponse = BasePageResponse<Employee>;
