import merge from "lodash.merge";

import { Page as PageType } from "@models/pages/types";

import { CommonPagesComponents } from "./CommonPagesComponents";
import { CommonPagesData } from "./CommonPagesData";

export const CommonPages: PageType = merge(CommonPagesComponents, CommonPagesData);
