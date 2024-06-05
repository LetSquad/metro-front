import classNames from "classnames";
import { Button, ButtonProps } from "semantic-ui-react";

import styles from "./styles/UnderscoreButton.module.scss";

export default function UnderscoreButton({ className, active, children, secondary, ...props }: ButtonProps & { active?: boolean }) {
    return (
        <Button secondary className={classNames(className, styles.button)} {...props}>
            <span>{children}</span>
        </Button>
    );
}
