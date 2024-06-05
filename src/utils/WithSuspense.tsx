import React, { Suspense } from "react";

import { Loader } from "semantic-ui-react";

import partsStyles from "@coreStyles/baseParts.module.scss";

interface WithSuspenseProps {
    loader?: React.JSX.Element;
    children: React.JSX.Element | React.JSX.Element[];
}

export function WithSuspense({ children, loader }: WithSuspenseProps): React.JSX.Element {
    return (
        <Suspense
            fallback={
                loader || (
                    <div className={partsStyles.flexBaseCenterContainer}>
                        <Loader active inline="centered" />
                    </div>
                )
            }
        >
            {children}
        </Suspense>
    );
}
