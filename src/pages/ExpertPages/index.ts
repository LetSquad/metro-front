import merge from "lodash.merge";

import { Page as PageType } from "@models/pages/types";

import { ExpertPagesComponents } from "./ExpertPagesComponents";
import { ExpertPagesData } from "./ExpertPagesData";

export const ExpertPages: PageType = merge(ExpertPagesComponents, ExpertPagesData);
