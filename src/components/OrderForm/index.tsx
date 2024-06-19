import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import classNames from "classnames";
import { FormikProvider, useFormik } from "formik";
import { Dimmer, Form, Loader, Segment } from "semantic-ui-react";

import useWebsocket from "@hooks/useWebsocket";
import { OrderFieldsName } from "@models/order/enums";
import { OrderCalculationResponse, OrderFormRef, OrderFormValues } from "@models/order/types";
import { WebSocketDataTypeEnum, WebSocketResponseActionEnum } from "@models/websocket/enums";
import { EditOrderWebSocketRequestData, WebSocketResponse } from "@models/websocket/types";
import PrimaryButton from "@parts/Buttons/PrimaryButton";
import SecondaryButton from "@parts/Buttons/SecondaryButton";
import UnderscoreButton from "@parts/Buttons/UnderscoreButton";
import formStyles from "@parts/EditForm/styles/AddEditForm.module.scss";
import { getEmployeesRequest } from "@store/employee/reducer";
import { selectCurrentEmployee } from "@store/employee/selectors";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { calculateOrderRequest } from "@store/order/reducer";
import { selectIsOrderUpdating } from "@store/order/selectors";
import { getPassengersRequest } from "@store/passenger/reducer";

import OrderFormFirstStep from "./OrderFormFirstStep";
import OrderFormSecondStep from "./OrderFormSecondStep";
import styles from "./styles/OrderForm.module.scss";
import { validationSchema } from "./validation";

enum STEP {
    PREPARE_STEP = "FIRST_STEP",
    FINISH_STEP = "FINISH_STEP"
}

interface OrderFormProps {
    orderId?: number;
    initialValues: Partial<OrderFormValues>;
    onSubmit: (values: Partial<OrderFormValues>) => void;
    onCancel?: () => void;
    className?: string;
    isEdit?: boolean;
}

const OrderForm = forwardRef(
    (
        { onSubmit, onCancel, initialValues, isEdit = false, className, orderId = -1 }: OrderFormProps,
        ref: React.ForwardedRef<OrderFormRef>
    ) => {
        const dispatch = useAppDispatch();

        const isOrderUpdating = useAppSelector(selectIsOrderUpdating);
        const currentEmployee = useAppSelector(selectCurrentEmployee);

        const [step, setStep] = useState(STEP.PREPARE_STEP);

        const onWebSocketMessage = useCallback(
            (eventData: WebSocketResponse) => {
                if (eventData.action === WebSocketResponseActionEnum.ERROR) {
                    toast.error("Данная заявка сейчас редактируется другим пользователем", {
                        id: `order-locked-for-edit-${orderId}`,
                        duration: 120_000
                    });
                }
            },
            [orderId]
        );

        const { startSocket } = useWebsocket<EditOrderWebSocketRequestData>(
            { type: WebSocketDataTypeEnum.ORDER_EDIT, login: currentEmployee?.login as string, id: orderId },
            onWebSocketMessage
        );

        const formik = useFormik<Partial<OrderFormValues>>({
            onSubmit,
            initialValues,
            validationSchema,
            validateOnMount: true
        });

        useImperativeHandle(
            ref,
            () => ({
                resetForm: formik.resetForm
            }),
            [formik.resetForm]
        );

        const onCalculation = useCallback(() => {
            formik.validateForm(formik.values).then(() => {
                dispatch(calculateOrderRequest(formik.values as OrderFormValues)).then((data) => {
                    if (calculateOrderRequest.fulfilled.type === data.type) {
                        const payload = data.payload as OrderCalculationResponse;
                        setStep(STEP.FINISH_STEP);
                        formik.setFieldValue(
                            OrderFieldsName.TRANSFERS,
                            payload.transfers.map((transfer) => ({
                                startStation: transfer.startStation.id,
                                finishStation: transfer.finishStation.id,
                                duration: transfer.duration,
                                isCrosswalking: transfer.isCrosswalking
                            }))
                        );
                        formik.setFieldValue(OrderFieldsName.DURATION, payload.duration);
                    }
                });
            });
        }, [dispatch, formik]);

        const loadInitialInfo = useCallback(() => {
            dispatch(getPassengersRequest());
            if (isEdit) {
                dispatch(getEmployeesRequest());
            }
        }, [dispatch, isEdit]);

        const isSubmitDisabled = useMemo(() => Object.keys(formik.errors).length > 0, [formik.errors]);

        const content = useMemo(() => {
            if (step === STEP.PREPARE_STEP) {
                return <OrderFormFirstStep isEdit={isEdit} isReadonly={false} />;
            }
            if (step === STEP.FINISH_STEP) {
                return (
                    <>
                        <OrderFormFirstStep isEdit={isEdit} isReadonly />
                        <OrderFormSecondStep />
                    </>
                );
            }

            return null;
        }, [isEdit, step]);

        const actions = useMemo(() => {
            if (step === STEP.PREPARE_STEP) {
                return (
                    <div className={formStyles.buttonContainer}>
                        {onCancel && (
                            <UnderscoreButton onClick={onCancel} type="button" loading={isOrderUpdating} disabled={isOrderUpdating}>
                                Отменить
                            </UnderscoreButton>
                        )}
                        <PrimaryButton
                            className={formStyles.primaryButton}
                            type="button"
                            onClick={onCalculation}
                            disabled={isSubmitDisabled || isOrderUpdating}
                            loading={isOrderUpdating}
                        >
                            Расчитать маршрут
                        </PrimaryButton>
                    </div>
                );
            }
            if (step === STEP.FINISH_STEP) {
                return (
                    <div className={formStyles.buttonContainer}>
                        {onCancel && (
                            <UnderscoreButton onClick={onCancel} type="button" loading={isOrderUpdating} disabled={isOrderUpdating}>
                                Отменить
                            </UnderscoreButton>
                        )}
                        <SecondaryButton
                            className={formStyles.primaryButton}
                            type="button"
                            onClick={() => setStep(STEP.PREPARE_STEP)}
                            disabled={isOrderUpdating}
                            loading={isOrderUpdating}
                        >
                            Назад
                        </SecondaryButton>
                        <PrimaryButton
                            className={formStyles.primaryButton}
                            type="submit"
                            disabled={isSubmitDisabled || isOrderUpdating}
                            loading={isOrderUpdating}
                        >
                            Сохранить
                        </PrimaryButton>
                    </div>
                );
            }

            return null;
        }, [isOrderUpdating, isSubmitDisabled, onCalculation, onCancel, step]);

        useEffect(() => {
            loadInitialInfo();
            if (isEdit) {
                startSocket();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [loadInitialInfo]);

        return (
            <Segment className={styles.segment}>
                <FormikProvider value={formik}>
                    <Form onSubmit={formik.handleSubmit} className={classNames(formStyles.form, className)}>
                        {isOrderUpdating && (
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        )}
                        {content}
                        {actions}
                    </Form>
                </FormikProvider>
            </Segment>
        );
    }
);

export default OrderForm;
