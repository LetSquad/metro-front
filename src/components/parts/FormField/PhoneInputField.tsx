import { useMemo } from "react";
import PhoneInput from "react-phone-input-2";
import ru from "react-phone-input-2/lang/ru.json";

import { useField } from "formik";
import { Form } from "semantic-ui-react";

import { PhoneNumberInputFieldProps } from "@models/forms/types";

import styles from "./styles/PhoneInputField.module.scss";

export default function PhoneInputField({
    name,
    label,
    className,
    placeholder,
    required = false,
    country = "ru",
    preferredCountries = ["ru"],
    onlyCountries = ["ru"],
    excludeCountries,
    disabled = false
}: PhoneNumberInputFieldProps) {
    const [{ value }, { error, touched }, { setValue, setTouched }] = useField<string | undefined>(name);

    const isErrorDisplay = useMemo(() => Boolean(error && (touched || (!touched && value))), [error, touched, value]);

    return (
        <Form.Input
            name={name}
            label={label}
            required={required}
            error={isErrorDisplay ? error : undefined}
            className={className}
            disabled={disabled}
            input={
                <PhoneInput
                    inputClass={styles.input}
                    country={country}
                    preferredCountries={preferredCountries}
                    onlyCountries={onlyCountries}
                    excludeCountries={excludeCountries}
                    value={value}
                    autoFormat
                    onChange={(_value) => setValue(_value)}
                    onBlur={() => setTouched(true)}
                    disableDropdown={onlyCountries?.length === 1}
                    localization={ru}
                    specialLabel={undefined}
                    placeholder={placeholder}
                    disabled={disabled}
                />
            }
        />
    );
}
