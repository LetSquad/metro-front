import React, { ReactNode } from "react";

import classNames from "classnames";
import { FieldArray } from "formik";
import { Icon } from "semantic-ui-react";

import { WithSuspense } from "@coreUtils/WithSuspense";
import { FormFieldProps } from "@models/forms/types";
import SecondaryButton from "@parts/Buttons/SecondaryButton";
import baseFormFieldsStyles from "@parts/EditForm/styles/BaseFormFields.module.scss";
import FormField from "@parts/FormField/FormField";
import FormFieldPlaceholder from "@parts/FormField/Placeholders/FormFieldPlaceholder";

import styles from "./styles/ArrayFormFields.module.scss";

export interface ArrayFormFieldsProps<T, V> {
    values: V;
    children?: (index: number) => ReactNode;
    arrayFieldName: keyof V;
    fields: (index: number) => FormFieldProps[];
    addButtonTitle: string;
    initialAddValue: T;
    numberOfFields?: 2 | 3 | 4;
}

export default function ArrayFormFields<T, V>({
    values,
    arrayFieldName,
    fields,
    addButtonTitle,
    initialAddValue,
    children,
    numberOfFields
}: ArrayFormFieldsProps<T, V>) {
    return (
        <FieldArray name={arrayFieldName as string}>
            {({ remove, push }) => (
                <div className={styles.fieldsArrayContainer}>
                    {(values[arrayFieldName] as T[])?.map((field, index) => (
                        <div
                            /* eslint-disable-next-line react/no-array-index-key */
                            key={index}
                            className={styles.rowContainer}
                        >
                            <div
                                className={classNames(styles.rowFieldsContainer, {
                                    [styles.rowFieldsContainerTwo]: numberOfFields === 2,
                                    [styles.rowFieldsContainerThree]: numberOfFields === 3,
                                    [styles.rowFieldsContainerFour]: numberOfFields === 4
                                })}
                            >
                                {fields(index).map((input) => (
                                    <WithSuspense key={input.name} loader={<FormFieldPlaceholder />}>
                                        <FormField {...input} className={baseFormFieldsStyles.field} />
                                    </WithSuspense>
                                ))}
                                {children && children(index)}
                            </div>
                            <Icon name="remove" link onClick={() => remove(index)} />
                        </div>
                    ))}
                    <SecondaryButton type="button" className={styles.newFieldButton} onClick={() => push(initialAddValue)}>
                        {addButtonTitle}
                    </SecondaryButton>
                </div>
            )}
        </FieldArray>
    );
}
