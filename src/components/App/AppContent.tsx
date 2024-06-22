import { Loader } from "semantic-ui-react";

import partsStyles from "@coreStyles/baseParts.module.scss";
import { WithSuspense } from "@coreUtils/WithSuspense";
import Routes from "@pages/Routes";
import { selectIsCurrentEmployeeLoading } from "@store/employee/selectors";
import { useAppSelector } from "@store/hooks";

import styles from "./styles/AppContent.module.scss";

export default function AppContent() {
    const isEmployeeLoading = useAppSelector(selectIsCurrentEmployeeLoading);

    return (
        <div className={styles.container}>
            <div className={styles.mainContentWrapper}>
                {isEmployeeLoading ? (
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
