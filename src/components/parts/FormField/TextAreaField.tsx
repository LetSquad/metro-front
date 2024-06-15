import { useMemo } from "react";

import { useField } from "formik";
import { Form } from "semantic-ui-react";

import { BaseFieldPropsWithDisabled } from "@models/forms/types";

export default function TextAreaField({
    name,
    label,
    className,
    placeholder,
    required = false,
    disabled = false
}: BaseFieldPropsWithDisabled) {
    const [{ value, onBlur, onChange }, { error, touched }] = useField<string | undefined>(name);

    const isErrorDisplay = useMemo(() => Boolean(error && (touched || (!touched && value))), [error, touched, value]);

    return (
        <Form.TextArea
            name={name}
            label={label}
            value={value === undefined || value === null ? "" : value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            required={required}
            error={isErrorDisplay ? error : undefined}
            className={className}
            disabled={disabled}
        />
    );
}
