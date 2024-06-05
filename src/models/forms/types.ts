import React from "react";

import { LabelProps } from "semantic-ui-react/dist/commonjs/elements/Label";
import { SemanticCOLORS, SemanticShorthandItem } from "semantic-ui-react/dist/commonjs/generic";

import { Placement } from "@floating-ui/react";

import { FormFieldType, ImageEditorPreviewType } from "./enums";

export interface BaseFieldProps {
    name: string;
    className?: string;
    label?: string;
    placeholder?: string;
    nullAvatar?: string;
    required?: boolean;
    isLoading?: boolean;
    errorText?: string | React.JSX.Element;
    promptError?: boolean;
    basicError?: boolean;
    errorColor?: SemanticCOLORS;
    defaultValue?: string;
}

export interface BaseInputFieldProps extends BaseFieldProps {
    disabled?: boolean;
    onChange?: (value: string) => void;
    clearable?: boolean;
    inputLabel?: SemanticShorthandItem<LabelProps>;
    labelPosition?: "left" | "right" | "left corner" | "right corner";
    maxLength?: number;
}

export interface NumberInputFieldProps extends BaseInputFieldProps {
    inputType: "number";
    max?: number;
    min?: number;
    step?: number;
}

export interface PasswordInputFieldProps extends BaseFieldProps {
    onChange?: (value: string) => void;
    hidden?: boolean;
    withStrength?: boolean;
}

export type InputFieldProps = NumberInputFieldProps | BaseInputFieldProps;

export interface ImageSelectorFieldProps extends BaseFieldProps {
    multiple?: boolean;
}

export interface PhoneNumberInputFieldProps extends BaseFieldProps {
    country?: string | number;
    onlyCountries?: string[];
    preferredCountries?: string[];
    excludeCountries?: string[];
}

export interface DropdownOption {
    text: string;
    value: string | number | boolean;
    content?: string | React.JSX.Element;
}

export interface DropdownFieldProps extends BaseFieldProps {
    options: DropdownOption[];
    search?: boolean;
    allowAdditions?: boolean;
    clearable?: boolean;
    multiple?: boolean;
}

export interface DatePickerFieldProps extends BaseFieldProps {
    onChange?: (value?: string) => void;
    maxDate?: Date;
    minDate?: Date;
    dateFormat?: string;
    popperPlacement?: Placement;
    disabled?: boolean;
    includeDates?: Date[];
}

export interface TimePickerFieldProps extends BaseFieldProps {
    onChange?: (value?: string) => void;
    timeCaption?: string;
    timeFormat?: string;
    maxTime?: Date;
    minTime?: Date;
    timeIntervals?: number;
    popperPlacement?: Placement;
    disabled?: boolean;
    includeTimes?: Date[];
}

export type DateTimePickerFieldProps = BaseFieldProps &
    DatePickerFieldProps &
    TimePickerFieldProps & {
        includeTimes?: Date[];
        includeDates?: Date[];
    };

export interface ImageEditorFieldProps extends BaseFieldProps {
    width?: number;
    height?: number;
    border?: number | number[];
    isBorderRadiusEnable?: boolean;
    borderColor?: number[];
    previewType?: ImageEditorPreviewType;
}

interface GroupFieldOptionsType {
    value: string;
    displayText: string;
}

export interface ButtonGroupFieldProps extends BaseFieldProps {
    options: GroupFieldOptionsType[];
    fluid?: boolean;
}

export interface FormFieldsRangeProps extends BaseFieldProps {
    from: FormFieldProps;
    to: FormFieldProps;
}

export interface RatingFieldProps extends BaseFieldProps {
    clearable?: boolean;
    maxRating?: number;
    size?: "mini" | "tiny" | "small" | "large" | "huge" | "massive";
}

export type FormFieldProps =
    | (PhoneNumberInputFieldProps & { type: FormFieldType.PHONE_NUMBER_INPUT })
    | (PasswordInputFieldProps & { type: FormFieldType.PASSWORD_INPUT })
    | (InputFieldProps & { type: FormFieldType.INPUT })
    | (BaseFieldProps & { type: FormFieldType.TEXTAREA })
    | (DropdownFieldProps & { type: FormFieldType.DROPDOWN })
    | (DatePickerFieldProps & { type: FormFieldType.DATEPICKER })
    | (TimePickerFieldProps & { type: FormFieldType.TIMEPICKER })
    | (DateTimePickerFieldProps & { type: FormFieldType.DATE_TIMEPICKER })
    | (ImageEditorFieldProps & { type: FormFieldType.IMAGE_EDITOR })
    | (ButtonGroupFieldProps & { type: FormFieldType.BUTTON_GROUP })
    | (BaseFieldProps & { type: FormFieldType.CHECKBOX })
    | (ImageSelectorFieldProps & { type: FormFieldType.IMAGE_SELECTOR })
    | (FormFieldsRangeProps & { type: FormFieldType.FORM_FIELDS_RANGE })
    | (RatingFieldProps & { type: FormFieldType.RATING });

export interface AccordionsFormFieldProps {
    id: string;
    initActiveState?: boolean;
    accordionTitle: string;
    fields: FormFieldProps[];
}
