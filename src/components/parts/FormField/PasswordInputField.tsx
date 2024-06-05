import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";

import classNames from "classnames";
import { useField } from "formik";
import { Form, Icon, Input, Label } from "semantic-ui-react";
import { InputOnChangeData } from "semantic-ui-react/dist/commonjs/elements/Input/Input";

import { PasswordInputFieldProps } from "@models/forms/types";

import styles from "./styles/PasswordInputField.module.scss";

const zxcvbn = await import(/* webpackChunkName: "zxcvbn" */ "zxcvbn");

export default function PasswordInputField({
    name,
    label,
    className,
    placeholder,
    required = false,
    withStrength = false,
    hidden = true,
    onChange: additionalOnChange
}: PasswordInputFieldProps) {
    const [{ value, onBlur, onChange }, { error, touched }] = useField<string | undefined>(name);

    const [inputType, setInputType] = useState<"text" | "password">("password");

    const inputRef = useRef<Input>(null);

    const changeInputType = useCallback(() => {
        setInputType(inputType === "password" ? "text" : "password");
        inputRef.current?.focus();
    }, [inputType]);

    const passwordStrength = useMemo(() => (!value || !withStrength ? null : zxcvbn.default(value).score), [value, withStrength]);

    const iconType = useMemo(() => (inputType === "password" ? "eye slash" : "eye"), [inputType]);

    const isErrorDisplay = useMemo(() => Boolean(error && (touched || (!touched && value))), [error, touched, value]);

    const onChangeValue = useCallback(
        (event: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
            if (additionalOnChange) {
                additionalOnChange(data.value);
            }
            onChange(event);
        },
        [additionalOnChange, onChange]
    );

    return (
        <Form.Field error={isErrorDisplay} required={required} className={classNames(styles.field, className)}>
            {label && <label htmlFor={name}>{label}</label>}
            <Input
                id={name}
                name={name}
                ref={inputRef}
                value={value === undefined || value === null ? "" : value}
                onChange={onChangeValue}
                onBlur={onBlur}
                placeholder={placeholder}
                type={inputType}
                icon={hidden ? <Icon name={iconType} onClick={changeInputType} link /> : undefined}
            />
            {withStrength && <span className={styles.passwordStrength} data-score={passwordStrength} />}
            {isErrorDisplay && (
                <Label pointing prompt>
                    {error}
                </Label>
            )}
        </Form.Field>
    );
}
