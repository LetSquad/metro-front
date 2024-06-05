import { useCallback } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames";

import { AdvancedItems, CommonItems } from "@coreUtils/MenuItems";
import { useLocationActive } from "@hooks/useLocationActive";
import { EmployeeRole } from "@models/employee/enums";
import { selectCurrentEmployeeRole } from "@store/employee/selectors";
import { useAppSelector } from "@store/hooks";

import styles from "./styles/useMenuOptions.module.scss";

export function useMenuOptions(onClose?: () => void) {
    const role = useAppSelector(selectCurrentEmployeeRole);

    const isLocationActive = useLocationActive();

    const getOptions = useCallback(
        (menuOptions: { name: string; url: string }[]) =>
            menuOptions.map((option) => (
                <Link
                    to={option.url}
                    key={option.url}
                    className={classNames(styles.item, { [styles.itemActive]: isLocationActive(option.url) })}
                    onClick={() => {
                        if (onClose) {
                            onClose();
                        }
                    }}
                >
                    {option.name}
                </Link>
            )),
        [isLocationActive, onClose]
    );

    switch (role) {
        case EmployeeRole.ADMIN:
        case EmployeeRole.OPERATOR:
        case EmployeeRole.SPECIALIST: {
            return getOptions(AdvancedItems);
        }
        default: {
            return getOptions(CommonItems);
        }
    }
}
