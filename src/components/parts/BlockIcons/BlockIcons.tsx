import React from "react";
import { Link, To } from "react-router-dom";

import { Icon } from "semantic-ui-react";

import styles from "./styles/BlockIcons.module.scss";

export enum BlockIconsSize {
    SMALL = "s",
    MEDIUM = "m",
    LARGE = "l"
}

export enum BlockIconsIndent {
    CENTER = "c",
    MEDIUM = "m",
    LARGE = "l"
}

type BlockIconsProps = {
    size?: BlockIconsSize;
    indent?: BlockIconsIndent;
    modalTitle?: string;
    additionalIcon?: (iconClassName: string) => React.JSX.Element;
} & (
    | {
          onEditClick?: () => void;
      }
    | {
          editLink?: To;
      }
);

export default function BlockIcons({
    size = BlockIconsSize.LARGE,
    indent = BlockIconsIndent.MEDIUM,
    modalTitle,
    additionalIcon,
    ...props
}: BlockIconsProps) {
    return (
        <div className={styles[`iconContainer${indent?.toUpperCase()}`]}>
            {!!additionalIcon && additionalIcon(styles[`icon${size?.toUpperCase()}`])}
            {"editLink" in props && props.editLink && (
                <Link to={props.editLink}>
                    <Icon className={styles[`icon${size?.toUpperCase()}`]} name="edit" link />
                </Link>
            )}
            {"onEditClick" in props && props.onEditClick && (
                <Icon className={styles[`icon${size?.toUpperCase()}`]} name="edit" link onClick={props.onEditClick} />
            )}
        </div>
    );
}
