import { useCallback } from "react";
import * as React from "react";
import { Link } from "react-router-dom";

import { Checkbox, Icon, Input } from "semantic-ui-react";
import { InputOnChangeData } from "semantic-ui-react/dist/commonjs/elements/Input/Input";

import { PageSlugs } from "@models/pages/enums";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { ordersDistributionRequest } from "@store/ordersDistribution/reducer";
import { selectIsOrdersDistributionLoading } from "@store/ordersDistribution/selectors";

import styles from "./styles/OrdersDistributionHeader.module.scss";

interface OrdersDistributionHeaderProps {
    toggleOrderDistributionMod: () => void;
    filterValue?: string;
    setFilterValue: (newFilterValue?: string) => void;
}

export default function OrdersDistributionHeader({
    toggleOrderDistributionMod,
    filterValue,
    setFilterValue
}: OrdersDistributionHeaderProps) {
    const dispatch = useAppDispatch();

    const isOrdersDistributionLoading = useAppSelector(selectIsOrdersDistributionLoading);

    const ordersDistribution = useCallback(() => {
        dispatch(ordersDistributionRequest());
    }, [dispatch]);

    const onInputChanged = useCallback(
        (_: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
            setFilterValue(data.value);
        },
        [setFilterValue]
    );

    const clearFilter = useCallback(() => {
        setFilterValue(undefined);
    }, [setFilterValue]);

    return (
        <div className={styles.container}>
            <div className={styles.toggleContainer}>
                <span>Расписание</span>
                <Checkbox toggle onClick={toggleOrderDistributionMod} />
                <span>Таблица</span>
            </div>
            <div className={styles.filterContainer}>
                Фильтр:
                <Input
                    value={filterValue}
                    onChange={onInputChanged}
                    icon={filterValue ? <Icon name="remove" link onClick={clearFilter} /> : undefined}
                />
            </div>
            <div className={styles.buttonsContainer}>
                <Link to={PageSlugs.PASSENGER_REGISTER}>
                    <PrimaryButton>Создать пользователя</PrimaryButton>
                </Link>
                <Link to={PageSlugs.ORDER_NEW}>
                    <PrimaryButton>Создать заявку</PrimaryButton>
                </Link>
                <PrimaryButton
                    disabled={isOrdersDistributionLoading}
                    loading={isOrdersDistributionLoading}
                    onClick={ordersDistribution}
                >
                    Распределить заявки
                </PrimaryButton>
            </div>
        </div>
    );
}
