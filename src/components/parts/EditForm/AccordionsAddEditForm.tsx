import { lazy, useState } from "react";

import classNames from "classnames";
import { FormikContextType } from "formik";
import { Accordion, Icon } from "semantic-ui-react";

import { WithSuspense } from "@coreUtils/WithSuspense";
import { AccordionsFormFieldProps } from "@models/forms/types";
import AddEditForm from "@parts/EditForm/AddEditForm";
import styles from "@parts/EditForm/styles/AccordionsAddEditForm.module.scss";
import FormFieldPlaceholder from "@parts/FormField/Placeholders/FormFieldPlaceholder";

const FormField = lazy(/* webpackChunkName: "FormField" */ () => import("@parts/FormField"));

export interface AccordionsFormProps<Values> {
    accordions: AccordionsFormFieldProps[];
    formik: FormikContextType<Values>;
    isLoading: boolean;
    submitButtonText?: string;
    onCancel?: () => void;
    cancelButtonText?: string;
    className?: string;
}

export default function AccordionsAddEditForm<Values>({
    accordions,
    formik,
    isLoading,
    submitButtonText,
    onCancel,
    cancelButtonText,
    className
}: AccordionsFormProps<Values>) {
    const [accordionsState, setAccordionsState] = useState<{ [id: string]: boolean }>(
        Object.assign({}, ...accordions.map((accordion) => ({ [accordion.id]: accordion.initActiveState || false })))
    );

    return (
        <AddEditForm
            formik={formik}
            isLoading={isLoading}
            submitButtonText={submitButtonText}
            onCancel={onCancel}
            cancelButtonText={cancelButtonText}
            className={className}
        >
            <Accordion className={styles.accordionContainer}>
                {accordions.map((accordion, index) => (
                    <div className={styles.accordion} key={accordion.id}>
                        <Accordion.Title
                            className={styles.accordionTitle}
                            active={accordionsState[accordion.id]}
                            index={index}
                            onClick={() => setAccordionsState({ ...accordionsState, [accordion.id]: !accordionsState[accordion.id] })}
                        >
                            <Icon name="dropdown" />
                            {accordion.accordionTitle}
                        </Accordion.Title>
                        <Accordion.Content active={accordionsState[accordion.id]}>
                            <div className={styles.accordionContent}>
                                {accordion.fields.map(({ className: fieldClassName, ...input }) => (
                                    <WithSuspense key={input.name} loader={<FormFieldPlaceholder />}>
                                        <FormField {...input} className={classNames(fieldClassName, styles.accordionContentField)} />
                                    </WithSuspense>
                                ))}
                            </div>
                        </Accordion.Content>
                    </div>
                ))}
            </Accordion>
        </AddEditForm>
    );
}

export type AccordionsAddEditFormType = typeof AccordionsAddEditForm;
