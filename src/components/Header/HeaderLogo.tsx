import { Link } from "react-router-dom";

import { Menu } from "semantic-ui-react";

import { PageSlugs } from "@models/pages/enums";
import logo from "@static/images/logo.svg";

import styles from "./styles/HeaderLogo.module.scss";

export default function HeaderLogo() {
    return (
        <Menu.Item header className={styles.menuItem}>
            <Link to={PageSlugs.ORDERS}>
                <img src={logo} alt="logo" className={styles.headerLogo} />
            </Link>
        </Menu.Item>
    );
}
