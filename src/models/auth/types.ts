import { ResetPasswordFieldName, SignInFieldName } from "@models/auth/enums";
import { EmployeeRole } from "@models/employee/enums";

export interface SignInFormValues {
    [SignInFieldName.PHONE]: string;
    [SignInFieldName.PASSWORD]: string;
}

export interface ResetPasswordFormValues {
    [ResetPasswordFieldName.PASSWORD]: string;
    [ResetPasswordFieldName.PASSWORD_CONFIRM]: string;
}

interface RolesResponse {
    role: EmployeeRole;
}

export type SignInResponse = RolesResponse;
