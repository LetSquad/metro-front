export enum OrderApplicationCodeEnum {
    PHONE = "PHONE",
    ELECTRONIC_SERVICES = "ELECTRONIC_SERVICES"
}

export enum OrderStatusCodeEnum {
    NOT_CONFIRMED = "NOT_CONFIRMED",
    REVIEW = "REVIEW",
    ACCEPTED = "ACCEPTED",
    INSPECTOR_WENT = "INSPECTOR_WENT",
    INSPECTOR_ARRIVED = "INSPECTOR_ARRIVED",
    RIDE = "RIDE",
    COMPLETED = "COMPLETED",
    IDENTIFICATION = "IDENTIFICATION",
    WAITING_LIST = "WAITING_LIST",
    CANCELED = "CANCELED",
    REJECTED = "REJECTED",
    PASSENGER_LATE = "PASSENGER_LATE",
    INSPECTOR_LATE = "INSPECTOR_LATE"
}

export enum OrderFieldsName {
    START_DESCRIPTION = "startDescription",
    FINISH_DESCRIPTION = "finishDescription",
    ORDER_APPLICATION = "orderApplication",
    PASSENGER_COUNT = "passengerCount",
    MALE_EMPLOYEE_COUNT = "maleEmployeeCount",
    FEMALE_EMPLOYEE_COUNT = "femaleEmployeeCount",
    ADDITIONAL_INFO = "additionalInfo",
    ORDER_TIME = "orderTime",
    PASSENGER = "passenger",
    BAGGAGE = "baggage",
    TRANSFERS = "transfers",
    DURATION = "duration",
    PASSENGER_CATEGORY = "passengerCategory",
    START_STATION = "startStation",
    FINISH_STATION = "finishStation",
    EMPLOYEES = "employees"
}

export enum OrdersFiltersFieldsName {
    PASSENGER_FIRST_NAME = "passengerFirstName",
    PASSENGER_LAST_NAME = "passengerLastName",
    PASSENGER_PHONE = "passengerPhone",
    EMPLOYEE_FIRST_NAME = "employeeFirstName",
    EMPLOYEE_LAST_NAME = "employeeLastName",
    EMPLOYEE_PHONE = "employeePhone",
    ORDER_CATEGORIES = "orderCategories",
    ORDER_STATUSES = "orderStatuses",
    DATE_FROM = "dateFrom",
    DATE_TO = "dateTo"
}

export enum TimeListActionType {
    TRANSFER = "TRANSFER",
    BREAK = "BREAK",
    DOWNTIME = "DOWNTIME",
    ORDER = "ORDER",
    NON_WORKING = "NON_WORKING"
}
