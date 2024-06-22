import React from "react";

import ResetPasswordForm from "@components/ResetPassword/ResetPasswordForm";
import { selectCurrentEmployee } from "@store/employee/selectors";
import { useAppSelector } from "@store/hooks";

export default function WithPasswordReset(props: { children: React.JSX.Element }) {
    const currentEmployee = useAppSelector(selectCurrentEmployee);

    if (currentEmployee?.isPasswordTemp) {
        return <ResetPasswordForm />;
    }
    return props.children;
}
