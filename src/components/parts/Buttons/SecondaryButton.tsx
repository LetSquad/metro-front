import classNames from "classnames";
import { Button, ButtonProps } from "semantic-ui-react";

import styles from "./styles/SecondaryButton.module.scss";

export default function SecondaryButton({ className, active, children, secondary, ...props }: ButtonProps & { active?: boolean }) {
    return (
        <Button secondary className={classNames(className, styles.button)} {...props}>
            <span>{children}</span>
        </Button>
    );
}
