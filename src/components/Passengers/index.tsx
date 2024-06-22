import { Loader } from "semantic-ui-react";

import PassengersList from "@components/Passengers/PassengersList";
import partsStyles from "@coreStyles/baseParts.module.scss";
import { selectCurrentEmployeeRole } from "@store/employee/selectors";
import { useAppSelector } from "@store/hooks";

export default function Passengers() {
    const employeeRole = useAppSelector(selectCurrentEmployeeRole);

    if (!employeeRole) {
        return (
            <div className={partsStyles.flexBaseCenterContainer}>
                <Loader active inline="centered" />
            </div>
        );
    }

    return <PassengersList />;
}
