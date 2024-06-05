import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { BasePageSlugs } from "@models/pages/enums";
import { resetCurrentEmployee } from "@store/employee/reducer";
import { useAppDispatch } from "@store/hooks";
import { setAuth, setRole } from "@store/info/reducer";

export function useLogout() {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    return useCallback(() => {
        dispatch(setAuth(false));
        dispatch(setRole(undefined));
        dispatch(resetCurrentEmployee());
        localStorage.removeItem("metro_role");
        navigate(BasePageSlugs.ORDERS);
    }, [dispatch, navigate]);
}
