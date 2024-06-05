import { PageSlugs } from "@models/pages/enums";
import { PageData } from "@models/pages/types";

export const AdvancedPagesData: PageData = {
    PASSENGERS: {
        name: "Пассажиры",
        slug: PageSlugs.PASSENGERS
    },
    PASSENGER: {
        name: "Пассажир",
        slug: PageSlugs.PASSENGER
    },
    PASSENGER_REGISTER: {
        name: "Регистрация пассажира",
        slug: PageSlugs.PASSENGER_REGISTER
    },
    EMPLOYEES: {
        name: "Работники",
        slug: PageSlugs.EMPLOYEES
    },
    EMPLOYEE: {
        name: "Работник",
        slug: PageSlugs.EMPLOYEE
    },
    ORDER_NEW: {
        name: "Новая заявка",
        slug: PageSlugs.ORDER_NEW
    },
    ORDERS_DISTRIBUTION: {
        name: "Распределение заявок",
        slug: PageSlugs.ORDERS_DISTRIBUTION
    }
};
