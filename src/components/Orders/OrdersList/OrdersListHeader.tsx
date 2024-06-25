import React, { useCallback } from "react";
import { Link } from "react-router-dom";

import { Checkbox, Dropdown, DropdownMenu } from "semantic-ui-react";

import { OrdersTableFieldsState } from "@components/Orders/OrdersList/OrdersTable";
import { useToggle } from "@hooks/useToogle";
import { TableFieldsState } from "@models/common/types";
import { PageSlugs } from "@models/pages/enums";
import PrimaryButton from "@parts/Buttons/PrimaryButton";

import styles from "./styles/OrdersListHeader.module.scss";

interface OrdersListHeaderProps {
    tableFields: OrdersTableFieldsState;
    setTableFields: (values: OrdersTableFieldsState) => void;
    ordersListMod: boolean;
    toggleOrdersListMod: () => void;
}

export default function OrdersListHeader({ tableFields, setTableFields, ordersListMod, toggleOrdersListMod }: OrdersListHeaderProps) {
    const [isMenuOpen, toggleMenu, openMenu, closeMenu] = useToggle();

    const onTableFieldChanged = useCallback(
        (changedKey: string) => {
            setTableFields(
                Object.fromEntries(
                    Object.entries(tableFields).map(([key, value]: [string, TableFieldsState]) => [
                        key,
                        key === changedKey ? { ...value, state: !value.state } : value
                    ])
                ) as unknown as OrdersTableFieldsState
            );
        },
        [setTableFields, tableFields]
    );

    return (
        <div className={styles.container}>
            <div className={styles.toggleContainer}>
                <span>Список</span>
                <Checkbox toggle checked={ordersListMod} onClick={toggleOrdersListMod} />
                <span>Таблица</span>
            </div>
            <div className={styles.buttonsContainer}>
                <Link to={PageSlugs.PASSENGER_REGISTER}>
                    <PrimaryButton>Создать пользователя</PrimaryButton>
                </Link>
                <Link to={PageSlugs.ORDER_NEW}>
                    <PrimaryButton>Создать заявку</PrimaryButton>
                </Link>
            </div>
            {ordersListMod && (
                <Dropdown
                    className={styles.dropdown}
                    size="big"
                    icon="bars"
                    open={isMenuOpen}
                    onClick={(e) => {
                        const target: Element = e.target as Element;
                        if (
                            target.id !== "hiddenColumnDropdown" &&
                            (target.querySelector("#hiddenColumnDropdown") ||
                                target.parentElement?.querySelector("#hiddenColumnDropdown"))
                        ) {
                            if (isMenuOpen) {
                                document.removeEventListener("click", closeMenu);
                            } else {
                                document.addEventListener("click", closeMenu, { once: true });
                            }
                            toggleMenu();
                        } else {
                            openMenu();
                        }
                    }}
                >
                    <DropdownMenu direction="left" id="hiddenColumnDropdown">
                        <div>
                            {Object.entries(tableFields).map(([key, value]: [string, TableFieldsState]) => (
                                <div key={key} data-key={key}>
                                    <Checkbox
                                        className={styles.dropdownCheckbox}
                                        checked={value.state}
                                        label={value.title}
                                        onClick={() => onTableFieldChanged(key)}
                                    />
                                    <div style={{ width: "100%", height: "0" }} />
                                </div>
                            ))}
                        </div>
                    </DropdownMenu>
                </Dropdown>
            )}
        </div>
    );
}
