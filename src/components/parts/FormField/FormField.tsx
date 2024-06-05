import { lazy, useMemo } from "react";

import { Form, Input, Label } from "semantic-ui-react";

import { WithSuspense } from "@coreUtils/WithSuspense";
import { FormFieldType } from "@models/forms/enums";
import { FormFieldProps } from "@models/forms/types";
import FormFieldPlaceholder from "@parts/FormField/Placeholders/FormFieldPlaceholder";

import styles from "./styles/FormField.module.scss";

const DatePickerField = lazy(/* webpackChunkName: "DatePickerField" */ () => import("./DatePickerField"));

const TimePickerField = lazy(/* webpackChunkName: "TimePickerField" */ () => import("./TimePickerField"));

const DateTimePickerField = lazy(/* webpackChunkName: "DateTimePickerField" */ () => import("./DateTimePickerField"));

const ImageEditorField = lazy(/* webpackChunkName: "ImageEditorField" */ () => import("./ImageEditorField"));

const InputField = lazy(/* webpackChunkName: "InputField" */ () => import("./InputField"));

const PasswordInputField = lazy(/* webpackChunkName: "PasswordInputField" */ () => import("./PasswordInputField"));

const PhoneInputField = lazy(/* webpackChunkName: "PhoneInputField" */ () => import("./PhoneInputField"));

const DropdownField = lazy(/* webpackChunkName: "DropdownField" */ () => import("./DropdownField"));

const TextAreaField = lazy(/* webpackChunkName: "TextAreaField" */ () => import("./TextAreaField"));
const CheckboxField = lazy(/* webpackChunkName: "CheckboxField" */ () => import("./CheckboxField"));
const ImageSelectorField = lazy(/* webpackChunkName: "ImageSelectorField" */ () => import("./ImageSelectorField"));
const RatingField = lazy(/* webpackChunkName: "ImageSelectorField" */ () => import("./RatingField"));
const ButtonGroupField = lazy(/* webpackChunkName: "ImageSelectorField" */ () => import("./ButtonGroupField"));
// eslint-disable-next-line import/no-cycle
const FormFieldsRange = lazy(/* webpackChunkName: "ImageSelectorField" */ () => import("./FormFieldsRange"));

export default function FormField({
    defaultValue,
    isLoading,
    errorText,
    basicError,
    promptError,
    errorColor,
    ...props
}: FormFieldProps) {
    const field = useMemo(() => {
        switch (props.type) {
            case FormFieldType.INPUT: {
                return <InputField {...props} />;
            }
            case FormFieldType.PHONE_NUMBER_INPUT: {
                return <PhoneInputField {...props} />;
            }
            case FormFieldType.PASSWORD_INPUT: {
                return <PasswordInputField {...props} />;
            }
            case FormFieldType.TEXTAREA: {
                return <TextAreaField {...props} />;
            }
            case FormFieldType.DROPDOWN: {
                return <DropdownField {...props} />;
            }
            case FormFieldType.DATEPICKER: {
                return <DatePickerField {...props} />;
            }
            case FormFieldType.TIMEPICKER: {
                return <TimePickerField {...props} />;
            }
            case FormFieldType.DATE_TIMEPICKER: {
                return <DateTimePickerField {...props} />;
            }
            case FormFieldType.IMAGE_EDITOR: {
                return <ImageEditorField {...props} />;
            }
            case FormFieldType.BUTTON_GROUP: {
                return <ButtonGroupField {...props} />;
            }
            case FormFieldType.CHECKBOX: {
                return <CheckboxField {...props} />;
            }
            case FormFieldType.IMAGE_SELECTOR: {
                return <ImageSelectorField {...props} />;
            }
            case FormFieldType.FORM_FIELDS_RANGE: {
                return <FormFieldsRange {...props} />;
            }
            case FormFieldType.RATING: {
                return <RatingField {...props} />;
            }
            // skip default
        }
    }, [props]);

    if ((defaultValue || isLoading || errorText) && props.type !== FormFieldType.FORM_FIELDS_RANGE) {
        return (
            <Form.Field className={props.className}>
                <label className={props.required ? styles.prepareFormFieldLabelRequired : undefined} htmlFor={props.name}>
                    {props.label}
                </label>
                <Input id={props.name} disabled placeholder={props.placeholder} defaultValue={defaultValue} loading={isLoading} />
                {errorText && (
                    <Label pointing prompt={promptError} basic={basicError} color={errorColor}>
                        {errorText}
                    </Label>
                )}
            </Form.Field>
        );
    }

    return <WithSuspense loader={<FormFieldPlaceholder />}>{field}</WithSuspense>;
}
