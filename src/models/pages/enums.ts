export enum PageSlugs {
    ORDERS = "/",
    ORDER = "/order/:orderId",
    ORDER_NEW = "/orders/new",
    ORDERS_DISTRIBUTION = "/orders/distribution",
    PASSENGERS = "/passengers",
    PASSENGER = "/passenger/:passengerId",
    PASSENGER_REGISTER = "/passengers/register",
    EMPLOYEES = "/employees",
    EMPLOYEE = "/employee/:employeeId",
    EMPLOYEE_REGISTER = "/employees/register"
}

export enum BasePageSlugs {
    ORDERS = PageSlugs.ORDERS,
    ORDER = PageSlugs.ORDER
}

export enum OperatorPageSlugs {
    PASSENGERS = PageSlugs.PASSENGERS,
    PASSENGER = PageSlugs.PASSENGER,
    PASSENGER_REGISTER = PageSlugs.PASSENGER_REGISTER,
    EMPLOYEES = PageSlugs.EMPLOYEES,
    EMPLOYEE = PageSlugs.EMPLOYEE,
    ORDER_NEW = PageSlugs.ORDER_NEW,
    ORDERS_DISTRIBUTION = PageSlugs.ORDERS_DISTRIBUTION
}

export enum SpecialistPageSlugs {
    PASSENGERS = PageSlugs.PASSENGERS,
    PASSENGER = PageSlugs.PASSENGER,
    PASSENGER_REGISTER = PageSlugs.PASSENGER_REGISTER,
    EMPLOYEES = PageSlugs.EMPLOYEES,
    EMPLOYEE = PageSlugs.EMPLOYEE,
    EMPLOYEE_REGISTER = PageSlugs.EMPLOYEE_REGISTER,
    ORDER_NEW = PageSlugs.ORDER_NEW,
    ORDERS_DISTRIBUTION = PageSlugs.ORDERS_DISTRIBUTION
}

export enum AdminPageSlugs {
    PASSENGERS = PageSlugs.PASSENGERS,
    PASSENGER = PageSlugs.PASSENGER,
    PASSENGER_REGISTER = PageSlugs.PASSENGER_REGISTER,
    EMPLOYEES = PageSlugs.EMPLOYEES,
    EMPLOYEE = PageSlugs.EMPLOYEE,
    EMPLOYEE_REGISTER = PageSlugs.EMPLOYEE_REGISTER,
    ORDER_NEW = PageSlugs.ORDER_NEW,
    ORDERS_DISTRIBUTION = PageSlugs.ORDERS_DISTRIBUTION
}
