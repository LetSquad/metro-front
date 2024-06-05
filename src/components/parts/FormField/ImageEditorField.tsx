import { useCallback, useMemo } from "react";

import classNames from "classnames";
import { useField } from "formik";
import { Label } from "semantic-ui-react";

import { useToggle } from "@hooks/useToogle";
import { ImageEditorPreviewType } from "@models/forms/enums";
import { ImageEditorFieldProps } from "@models/forms/types";
import SecondaryButton from "@parts/Buttons/SecondaryButton";
import imageNotFound from "@static/images/imageNotFound.png";

import ImageSelector from "../ImageSelector/ImageSelector";
import ImageWithLoading from "../ImageWithLoading/ImageWithLoading";
import styles from "./styles/ImageEditorField.module.scss";

export default function ImageEditorField({
    name,
    label,
    className,
    placeholder = imageNotFound,
    nullAvatar = imageNotFound,
    required = false,
    width,
    height,
    border,
    isBorderRadiusEnable,
    borderColor,
    previewType = ImageEditorPreviewType.BOTH
}: ImageEditorFieldProps) {
    const [{ value }, { error, touched }, { setValue, setTouched }] = useField<string | File>({ name });

    const [isEditorOpen, , openEditor, closeEditor] = useToggle();

    const getUrlForImage = useCallback((image: File | string) => (typeof image === "string" ? image : URL.createObjectURL(image)), []);

    const isErrorDisplay = useMemo(() => Boolean(error && (touched || (!touched && value))), [error, touched, value]);

    return (
        <div
            className={classNames(
                "field",
                {
                    required,
                    error: isErrorDisplay
                },
                className
            )}
        >
            {label && (
                <label htmlFor={name} className="label">
                    {label}
                </label>
            )}
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    {(previewType === ImageEditorPreviewType.SQUARE || previewType === ImageEditorPreviewType.BOTH) && (
                        <ImageWithLoading className={styles.imageSquare} src={value ? getUrlForImage(value) : nullAvatar} />
                    )}
                    {(previewType === ImageEditorPreviewType.CIRCLE || previewType === ImageEditorPreviewType.BOTH) && (
                        <ImageWithLoading
                            className={previewType === ImageEditorPreviewType.BOTH ? styles.image : styles.imageSecond}
                            src={value ? getUrlForImage(value) : nullAvatar}
                            circular
                        />
                    )}
                </div>
                <SecondaryButton type="button" className={styles.button} onClick={() => openEditor()}>
                    Изменить фото
                </SecondaryButton>
            </div>
            {isEditorOpen && (
                <ImageSelector
                    closeModal={() => closeEditor()}
                    image={value}
                    saveImage={(image) => {
                        setValue(image);
                        setTouched(true);
                    }}
                    width={width}
                    height={height}
                    border={border}
                    borderColor={borderColor}
                    isBorderRadiusEnable={isBorderRadiusEnable}
                    placeholder={placeholder}
                />
            )}
            {isErrorDisplay && (
                <Label pointing prompt>
                    {error}
                </Label>
            )}
        </div>
    );
}
