import { useCallback } from "react";

import createAuthRefreshInterceptor from "axios-auth-refresh";

import axios from "@api/api";
import apiUrls from "@api/apiUrls";
import AppContent from "@components/App/AppContent";
import Header from "@components/Header";
import { useLogout } from "@hooks/useLogout";
import { SignInResponse } from "@models/auth/types";
import { useAppDispatch } from "@store/hooks";
import { setRole } from "@store/info/reducer";

import styles from "./styles/App.module.scss";

export default function App() {
    const dispatch = useAppDispatch();

    const logout = useLogout();

    const refreshAuthLogic = useCallback(
        () =>
            axios.post<SignInResponse>(apiUrls.refreshToken(), undefined, { validateStatus: () => true }).then((response) => {
                if (response.status === 200) {
                    localStorage.setItem("metro_role", JSON.stringify(response.data.role));
                    dispatch(setRole(response.data.role));
                    return;
                }

                logout();
                throw new Error("Error while authentication");
            }),
        [dispatch, logout]
    );

    createAuthRefreshInterceptor(axios, refreshAuthLogic);

    return (
        <div id="app" className={styles.app}>
            <Header />
            <AppContent />
        </div>
    );
}
