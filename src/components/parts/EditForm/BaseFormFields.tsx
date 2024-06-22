import React, { lazy, PropsWithChildren } from "react";

import classNames from "classnames";

import { WithSuspense } from "@coreUtils/WithSuspense";
import { FormFieldProps } from "@models/forms/types";
import FormFieldPlaceholder from "@parts/FormField/Placeholders/FormFieldPlaceholder";

import styles from "./styles/BaseFormFields.module.scss";

const FormField = lazy(/* webpackChunkName: "FormField" */ () => import("@parts/FormField"));

export interface BaseFormFieldsProps extends PropsWithChildren {
    fields: FormFieldProps[];
}

export default function BaseFormFields({ fields, children }: BaseFormFieldsProps) {
    return (
        <div className={styles.fields}>
            {fields.map(({ className: fieldClassName, ...input }) => (
                <WithSuspense key={input.name} loader={<FormFieldPlaceholder />}>
                    <FormField {...input} className={classNames(fieldClassName, styles.field)} />
                </WithSuspense>
            ))}
            {children}
        </div>
    );
}
