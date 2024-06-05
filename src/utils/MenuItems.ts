import { PageSlugs } from "@models/pages/enums";

export const CommonItems: { name: string; url: string }[] = [
    {
        name: "Заявки",
        url: PageSlugs.ORDERS
    }
];

export const AdvancedItems: { name: string; url: string }[] = [
    ...CommonItems,
    {
        name: "Распределение заявок",
        url: PageSlugs.ORDERS_DISTRIBUTION
    },
    {
        name: "Пассажиры",
        url: PageSlugs.PASSENGERS
    },
    {
        name: "Работники",
        url: PageSlugs.EMPLOYEES
    }
];
