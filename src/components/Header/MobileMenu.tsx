import { Dropdown, Icon, Menu } from "semantic-ui-react";

import HeaderLogo from "@components/Header/HeaderLogo";
import { useAppSelector } from "@store/hooks";
import { selectIsEmployeeNotAuth } from "@store/info/selectors";

import styles from "./styles/MobileMenu.module.scss";

interface MobileMenuProps {
    setSidebarOpen: () => void;
}

export default function MobileMenu({ setSidebarOpen }: MobileMenuProps) {
    const isNotAuth = useAppSelector(selectIsEmployeeNotAuth);

    return (
        <>
            <HeaderLogo />
            {!isNotAuth && (
                <Menu.Item position="right" header className={styles.headerItem}>
                    <Dropdown
                        item
                        simple
                        onClick={setSidebarOpen}
                        icon={<Icon size="big" name="bars" className={styles.mobileDropdownIcon} />}
                        className={styles.mobileDropdown}
                    />
                </Menu.Item>
            )}
        </>
    );
}
