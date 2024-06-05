import { SignInFieldName } from "@models/auth/enums";
import { EmployeeRole } from "@models/employee/enums";

export interface SignInFormValues {
    [SignInFieldName.PHONE]: string;
    [SignInFieldName.PASSWORD]: string;
}

interface RolesResponse {
    role: EmployeeRole;
}

export type SignInResponse = RolesResponse;
