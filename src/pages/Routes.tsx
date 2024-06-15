import { useMemo } from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

import merge from "lodash.merge";

import NotFoundErrorScreen from "@coreUtils/NotFoundErrorScreen";
import { EmployeeRole } from "@models/employee/enums";
import { AdvancedPages } from "@pages/AdvancedPages";
import { CommonPages } from "@pages/CommonPages";
import { ExpertPages } from "@pages/ExpertPages";
import { pagesToRoutes } from "@pages/utils";
import { selectCurrentEmployeeRole } from "@store/employee/selectors";
import { useAppSelector } from "@store/hooks";
import { selectEmployeeRole } from "@store/info/selectors";

export default function Routes() {
    const currentEmployeeRole = useAppSelector(selectCurrentEmployeeRole);
    const employeeRole = useAppSelector(selectEmployeeRole);

    const role = currentEmployeeRole ?? employeeRole;

    const pages = useMemo(() => {
        const expertPages = merge(AdvancedPages, ExpertPages);

        switch (role) {
            case EmployeeRole.SPECIALIST: {
                return expertPages;
            }
            case EmployeeRole.OPERATOR: {
                return AdvancedPages;
            }
            case EmployeeRole.ADMIN: {
                return expertPages;
            }
            default: {
                return null;
            }
        }
    }, [role]);

    return (
        <RouterRoutes>
            {pagesToRoutes(CommonPages)}
            {pages && pagesToRoutes(pages)}
            <Route key="not-found" path="*" element={<NotFoundErrorScreen />} />
        </RouterRoutes>
    );
}
