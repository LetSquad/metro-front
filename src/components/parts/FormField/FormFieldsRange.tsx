import classNames from "classnames";
import { Form } from "semantic-ui-react";

import { FormFieldsRangeProps } from "@models/forms/types";
// eslint-disable-next-line import/no-cycle
import FormField from "@parts/FormField/FormField";

import styles from "./styles/FormFieldsRange.module.scss";

export default function FormFieldsRange({
    name,
    label,
    className,
    required = false,
    from: { className: fromClassName, ...from },
    to: { className: toClassName, ...to }
}: FormFieldsRangeProps) {
    return (
        <Form.Field required={required} className={className}>
            {label && <label htmlFor={name}>{label}</label>}
            <div className={styles.fields}>
                <FormField {...from} className={classNames(styles.field, fromClassName)} />
                <span className={styles.divider}>-</span>
                <FormField {...to} className={classNames(styles.field, toClassName)} />
            </div>
        </Form.Field>
    );
}
