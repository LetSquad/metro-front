import merge from "lodash.merge";

import { Page as PageType } from "@models/pages/types";

import { AdvancedPagesComponents } from "./AdvancedPagesComponents";
import { AdvancedPagesData } from "./AdvancedPagesData";

export const AdvancedPages: PageType = merge(AdvancedPagesComponents, AdvancedPagesData);
