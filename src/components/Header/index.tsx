import React, { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

import classNames from "classnames";
import { Icon, Menu } from "semantic-ui-react";

import DesktopMenu from "@components/Header/DesktopMenu";
import MobileMenu from "@components/Header/MobileMenu";
import { TABLET_MAX_WIDTH } from "@coreUtils/constants";
import { useLogout } from "@hooks/useLogout";
import { useMenuOptions } from "@hooks/useMenuOptions";
import { useToggle } from "@hooks/useToogle";
import { getEmployeeRequest } from "@store/employee/reducer";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { selectIsEmployeeNotAuth } from "@store/info/selectors";

import styles from "./styles/Header.module.scss";

export default function Header() {
    const dispatch = useAppDispatch();

    const isNotAuth = useAppSelector(selectIsEmployeeNotAuth);

    const [position, setPosition] = useState(window.scrollY);
    const [visible, setVisible] = useState(true);
    const [isSidebarOpen, , openSidebar, closeSidebar] = useToggle();

    const menuOptions = useMenuOptions(closeSidebar);
    const logout = useLogout();

    const isMobile = useMediaQuery({ maxWidth: TABLET_MAX_WIDTH });

    const onLogoutClick = useCallback(() => {
        closeSidebar();
        logout();
    }, [logout, closeSidebar]);

    const handleScroll = useCallback(() => {
        const moving = document.querySelector("#app")?.scrollTop || 0;

        setVisible(position > moving);
        setPosition(moving);
    }, [position]);

    useEffect(() => {
        if (!isNotAuth) {
            dispatch(getEmployeeRequest());
        }
    }, [dispatch, isNotAuth]);

    useEffect(() => {
        document.querySelector("#app")?.addEventListener("scroll", handleScroll);
        return () => {
            document.querySelector("#app")?.removeEventListener("scroll", handleScroll);
        };
    }, [handleScroll]);

    return (
        <>
            {isMobile && (
                <div className={isSidebarOpen ? styles.sidebarShow : styles.sidebarClose}>
                    <Icon name="close" link onClick={closeSidebar} size="big" className={styles.sidebarCloseIcon} />
                    <div className={styles.sidebarItemsContainer}>
                        {menuOptions}
                        <div aria-hidden className={styles.sidebarExitItem} onClick={onLogoutClick}>
                            Выйти
                        </div>
                    </div>
                </div>
            )}
            <Menu
                attached="top"
                className={classNames(styles.header, {
                    [styles.headerVisible]: visible,
                    [styles.headerHidden]: !visible,
                    [styles.headerScroll]: position > 30
                })}
            >
                {isMobile ? <MobileMenu setSidebarOpen={openSidebar} /> : <DesktopMenu />}
            </Menu>
        </>
    );
}
