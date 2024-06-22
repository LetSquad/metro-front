import { Loader } from "semantic-ui-react";

import partsStyles from "@coreStyles/baseParts.module.scss";
import { WithSuspense } from "@coreUtils/WithSuspense";
import Routes from "@pages/Routes";
import { selectIsCurrentEmployeeLoading } from "@store/employee/selectors";
import { useAppSelector } from "@store/hooks";
import { selectIsEmployeeNotAuth } from "@store/info/selectors";

import styles from "./styles/AppContent.module.scss";

export default function AppContent() {
    const isEmployeeLoading = useAppSelector(selectIsCurrentEmployeeLoading);
    const isNotAuth = useAppSelector(selectIsEmployeeNotAuth);

    return (
        <div className={styles.container}>
            <div className={styles.mainContentWrapper}>
                {isEmployeeLoading && !isNotAuth ? (
                    <div className={partsStyles.flexBaseCenterContainer}>
                        <Loader active inline="centered" />
                    </div>
                ) : (
                    <WithSuspense>
                        <Routes />
                    </WithSuspense>
                )}
            </div>
        </div>
    );
}
