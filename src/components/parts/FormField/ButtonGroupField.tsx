import { useCallback, useMemo } from "react";

import { useField } from "formik";
import { Button, ButtonGroup, Form, Label } from "semantic-ui-react";

import { ButtonGroupFieldProps } from "@models/forms/types";

import styles from "./styles/ButtonGroupField.module.scss";

export default function ButtonGroupField({ name, label, className, required = false, fluid = false, options }: ButtonGroupFieldProps) {
    const [{ value }, { error, touched }, { setValue, setTouched }] = useField<string | number | undefined>(name);

    const isErrorDisplay = useMemo(() => Boolean(error && (touched || (!touched && value))), [error, touched, value]);

    const onClick = useCallback(
        (_value: string | number) => {
            setValue(_value);
            setTouched(true);
        },
        [setTouched, setValue]
    );

    return (
        <Form.Field error={isErrorDisplay} required={required} className={className}>
            {label && <label htmlFor={name}>{label}</label>}
            <ButtonGroup fluid={fluid}>
                {options.map((option) => (
                    <Button
                        key={option.value}
                        active={option.value === value}
                        onClick={() => onClick(option.value)}
                        type="button"
                        className={styles.button}
                    >
                        {option.displayText}
                    </Button>
                ))}
            </ButtonGroup>
            {isErrorDisplay && (
                <Label pointing prompt>
                    {error}
                </Label>
            )}
        </Form.Field>
    );
}
