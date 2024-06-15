import * as React from "react";

interface PageDataContent {
    name: string;
    slug: string;
}

interface PageComponentsContent {
    component: React.ComponentType;
}

export type Page = Record<string, PageDataContent & PageComponentsContent>;

export type PageData = Record<string, PageDataContent>;

export type PageComponents = Record<string, PageComponentsContent>;
