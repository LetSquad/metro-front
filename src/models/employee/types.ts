import { Sex } from "@models/common/enums";
import { EmployeeFieldsName, EmployeeRole, RankFieldsName } from "@models/employee/enums";

export interface EmployeeRank {
    code: string;
    name: string;
    shortName?: string | null;
}

export interface Employee {
    id: number;
    employeeRole: EmployeeRole;
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

export type EmployeeFormFields = Omit<Employee, "id" | "employeeRole" | "rank"> & { [RankFieldsName.RANK_CODE]: string };

export type EmployeeResponse = Employee;
