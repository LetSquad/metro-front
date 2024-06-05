import "@coreStyles/globals.scss";
import "./mocks";

import { createRoot } from "react-dom/client";
import { toast, ToastBar, Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { Icon } from "semantic-ui-react";

import App from "@components/App";
import { BASENAME } from "@coreUtils/constants";
import WithErrorBoundaries from "@coreUtils/WithErrorBoundaries";
import { store } from "@store/index";

import styles from "./styles/index.module.scss";

createRoot(document.querySelector("#root") as Element).render(
    <WithErrorBoundaries>
        <BrowserRouter basename={BASENAME}>
            <Provider store={store}>
                <App />
            </Provider>
            <Toaster
                position="bottom-right"
                gutter={8}
                toastOptions={{
                    className: styles.toast,
                    success: {
                        duration: 10_000
                    },
                    error: {
                        duration: 10_000
                    }
                }}
            >
                {(t) => (
                    <ToastBar toast={t}>
                        {({ icon, message }) => (
                            <>
                                {icon}
                                {message}
                                {t.type !== "loading" && (
                                    <Icon name="remove" className={styles.toastDismissIcon} onClick={() => toast.dismiss(t.id)} link />
                                )}
                            </>
                        )}
                    </ToastBar>
                )}
            </Toaster>
        </BrowserRouter>
    </WithErrorBoundaries>
);
