import { PageSlugs } from "@models/pages/enums";
import { PageData } from "@models/pages/types";

export const CommonPagesData: PageData = {
    ORDERS: {
        name: "Заявки",
        slug: PageSlugs.ORDERS
    },
    ORDER: {
        name: "Заявка",
        slug: PageSlugs.ORDER
    }
};
