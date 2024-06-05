import React, { PropsWithChildren } from "react";

import { FormikContextType } from "formik";

import { FormFieldProps } from "@models/forms/types";
import AddEditForm from "@parts/EditForm/AddEditForm";
import BaseFormFields from "@parts/EditForm/BaseFormFields";

export interface BaseFormProps<Values> extends PropsWithChildren {
    fields: FormFieldProps[];
    formik: FormikContextType<Values>;
    isLoading: boolean;
    submitButtonText?: string;
    onCancel?: () => void;
    cancelButtonText?: string;
    className?: string;
}

export default function BaseAddEditForm<Values>({
    fields,
    children,
    formik,
    isLoading,
    submitButtonText,
    onCancel,
    cancelButtonText,
    className
}: BaseFormProps<Values>) {
    return (
        <AddEditForm
            formik={formik}
            isLoading={isLoading}
            submitButtonText={submitButtonText}
            onCancel={onCancel}
            cancelButtonText={cancelButtonText}
            className={className}
        >
            <BaseFormFields fields={fields}>{children}</BaseFormFields>
        </AddEditForm>
    );
}

export type BaseAddEditFormType = typeof BaseAddEditForm;
