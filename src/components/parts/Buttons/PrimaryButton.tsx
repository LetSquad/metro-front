import classNames from "classnames";
import { Button, ButtonProps } from "semantic-ui-react";

import { capitalizeFirstLetter } from "@coreUtils/utils";

import styles from "./styles/PrimaryButton.module.scss";

interface PrimaryButtonProps extends Omit<ButtonProps, "color"> {
    active?: boolean;
    color?: "default" | "negative" | "positive";
}

export default function PrimaryButton({ className, active, children, color = "default", ...props }: PrimaryButtonProps) {
    return (
        <Button className={classNames(className, styles.button, styles[`button${capitalizeFirstLetter(color)}`])} {...props}>
            <span>{children}</span>
        </Button>
    );
}
