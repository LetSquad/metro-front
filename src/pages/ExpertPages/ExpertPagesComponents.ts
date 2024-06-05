import { lazy } from "react";

import { PageComponents } from "@models/pages/types";

const AddEmployee = lazy(/* webpackChunkName: "AddEmployee" */ () => import("@components/AddEmployee"));

export const ExpertPagesComponents: PageComponents = {
    EMPLOYEE_REGISTER: {
        component: AddEmployee
    }
};
