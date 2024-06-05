import { ChangeEvent, useCallback, useMemo } from "react";

import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

import { ImageSelectorFieldProps } from "@models/forms/types";

import styles from "./styles/ImageSelector.module.scss";

export default function ImageSelectorField({
    name,
    label,
    className,
    placeholder,
    required = false,
    multiple = false
}: ImageSelectorFieldProps) {
    const [{ value }, { error, touched }, { setValue, setTouched }] = useField<File[] | File | string[] | string | undefined>(name);

    const isErrorDisplay = useMemo(() => Boolean(error && (touched || (!touched && value))), [error, touched, value]);

    const onChangeValue = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const files = event.target?.files;

            if (files) {
                if (multiple) {
                    const filesArray: File[] = [];
                    for (let i = 0; i < files.length; i++) {
                        const file = files.item(i);

                        if (file) {
                            filesArray.push(file);
                        }
                    }
                    setValue(filesArray);
                } else {
                    setValue(files.item(0) ?? undefined);
                }
            } else {
                setValue(undefined);
            }

            setTouched(true);
        },
        [multiple, setTouched, setValue]
    );

    const valueForView = useMemo(() => {
        if (value === undefined || value === null) {
            return undefined;
        }

        if (typeof value === "string") {
            return value;
        }

        if (!Array.isArray(value)) {
            return value.name;
        }

        return value.map((file) => (typeof file === "string" ? file : file.name)).join(", ");
    }, [value]);

    return (
        <Form.Field error={isErrorDisplay} required={required} className={className}>
            {label && <label htmlFor={name}>{label}</label>}
            <div className={styles.inputContainer}>
                <label className={styles.input}>
                    <input id={name} name={name} onChange={onChangeValue} type="file" accept="image/png, image/jpeg" multiple />
                    <span className={styles.inputButton}>{multiple ? "Выберите файлы" : "Выберете файл"}</span>
                    <span className={styles.inputFilesTitle}>{valueForView}</span>
                </label>
                {placeholder && <span className={styles.placeholder}>{placeholder}</span>}
            </div>
            {isErrorDisplay && (
                <Label pointing prompt>
                    {error}
                </Label>
            )}
        </Form.Field>
    );
}
