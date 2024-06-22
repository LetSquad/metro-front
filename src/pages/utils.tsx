import { Route } from "react-router-dom";

import WithAuth from "@coreUtils/WithAuth";
import WithPasswordReset from "@coreUtils/WithPasswordReset";
import { WithSuspense } from "@coreUtils/WithSuspense";
import { Page as PageType } from "@models/pages/types";

export function pagesToRoutes(pages: PageType) {
    return (
        Object.values(pages)
            // eslint-disable-next-line @typescript-eslint/naming-convention
            .map(({ slug, component: Component }) => (
                <Route
                    key={slug}
                    path={slug}
                    element={
                        <WithAuth>
                            <WithPasswordReset>
                                <WithSuspense>
                                    <Component />
                                </WithSuspense>
                            </WithPasswordReset>
                        </WithAuth>
                    }
                />
            ))
    );
}
