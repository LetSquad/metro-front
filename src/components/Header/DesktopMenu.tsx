import { Menu } from "semantic-ui-react";

import HeaderLogo from "@components/Header/HeaderLogo";
import { useLogout } from "@hooks/useLogout";
import { useMenuOptions } from "@hooks/useMenuOptions";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import { useAppSelector } from "@store/hooks";
import { selectIsEmployeeNotAuth } from "@store/info/selectors";

import styles from "./styles/DesktopMenu.module.scss";
import headerStyles from "./styles/Header.module.scss";

export default function DesktopMenu() {
    const isNotAuth = useAppSelector(selectIsEmployeeNotAuth);

    const menuOptions = useMenuOptions();

    const onLogoutButtonClicked = useLogout();

    return (
        <>
            <HeaderLogo />
            <div className={styles.itemsContainer}>{menuOptions}</div>
            {!isNotAuth && (
                <Menu.Item position="right" className={headerStyles.buttonContainer}>
                    <PrimaryButton className={headerStyles.button} onClick={onLogoutButtonClicked}>
                        Выйти
                    </PrimaryButton>
                </Menu.Item>
            )}
        </>
    );
}
