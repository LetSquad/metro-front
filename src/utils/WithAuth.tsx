import React, { useCallback } from "react";

import AuthForm from "@components/Auth/AuthForm";
import LoadingErrorBlock from "@parts/LoadingErrorBlock/LoadingErrorBlock";
import { getEmployeeRequest } from "@store/employee/reducer";
import { selectIsCurrentEmployeeLoadingFailed } from "@store/employee/selectors";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { selectIsEmployeeNotAuth } from "@store/info/selectors";

export default function WithAuth(props: { children: React.JSX.Element }) {
    const dispatch = useAppDispatch();

    const isNotAuth = useAppSelector(selectIsEmployeeNotAuth);
    const isEmployeeInfoLoadingFailed = useAppSelector(selectIsCurrentEmployeeLoadingFailed);

    const reloadEmployeeInfo = useCallback(() => dispatch(getEmployeeRequest()), [dispatch]);

    if (isNotAuth) {
        return <AuthForm />;
    }

    if (isEmployeeInfoLoadingFailed) {
        return <LoadingErrorBlock isLoadingErrorObjectText="информации о профиле" reload={reloadEmployeeInfo} />;
    }

    return props.children;
}
