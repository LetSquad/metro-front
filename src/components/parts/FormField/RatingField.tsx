import "./styles/RatingField.module.scss";

import { MouseEvent, useCallback, useMemo } from "react";

import { useField } from "formik";
import { Form, Label, Rating } from "semantic-ui-react";
import { RatingProps } from "semantic-ui-react/dist/commonjs/modules/Rating/Rating";

import { RatingFieldProps } from "@models/forms/types";

export default function RatingField({
    name,
    label,
    className,
    required = false,
    clearable = false,
    maxRating = 5,
    size
}: RatingFieldProps) {
    const [{ value }, { error, touched }, { setValue, setTouched }] = useField<number | undefined>(name);

    const isErrorDisplay = useMemo(() => Boolean(error && (touched || (!touched && value))), [error, touched, value]);

    const onChange = useCallback(
        (event: MouseEvent<HTMLDivElement>, { rating }: RatingProps) => {
            setValue(rating as number | undefined);
            setTouched(true);
        },
        [setTouched, setValue]
    );

    return (
        <Form.Field error={isErrorDisplay} required={required} className={className}>
            {label && <label htmlFor={name}>{label}</label>}
            <Rating id={name} name={name} value={value} onRate={onChange} clearable={clearable} maxRating={maxRating} size={size} />
            {isErrorDisplay && (
                <Label pointing prompt>
                    {error}
                </Label>
            )}
        </Form.Field>
    );
}
