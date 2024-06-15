import React, { PropsWithChildren, useMemo } from "react";

import classNames from "classnames";
import { FormikContextType, FormikProvider } from "formik";
import { Dimmer, Form, Loader } from "semantic-ui-react";

import PrimaryButton from "@parts/Buttons/PrimaryButton";
import UnderscoreButton from "@parts/Buttons/UnderscoreButton";

import styles from "./styles/AddEditForm.module.scss";

export interface FormProps<Values> extends PropsWithChildren {
    formik: FormikContextType<Values>;
    isLoading: boolean;
    submitButtonText?: string;
    onCancel?: () => void;
    cancelButtonText?: string;
    className?: string;
}

export default function AddEditForm<Values>({
    children,
    formik,
    isLoading,
    submitButtonText,
    onCancel,
    cancelButtonText,
    className
}: FormProps<Values>) {
    const isSubmitDisabled = useMemo(() => Object.keys(formik.errors).length > 0, [formik.errors]);

    return (
        <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit} className={classNames(styles.form, className)}>
                {isLoading && (
                    <Dimmer active>
                        <Loader />
                    </Dimmer>
                )}
                {children}
                <div className={styles.buttonContainer}>
                    {onCancel && (
                        <UnderscoreButton onClick={onCancel} type="button" loading={isLoading} disabled={isLoading}>
                            {cancelButtonText ?? "Отменить"}
                        </UnderscoreButton>
                    )}
                    <PrimaryButton
                        className={styles.primaryButton}
                        type="submit"
                        disabled={isSubmitDisabled || isLoading}
                        loading={isLoading}
                    >
                        {submitButtonText ?? "Сохранить"}
                    </PrimaryButton>
                </div>
            </Form>
        </FormikProvider>
    );
}
