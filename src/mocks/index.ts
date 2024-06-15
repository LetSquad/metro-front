import MockAdapter from "axios-mock-adapter";

import { mockAxios } from "@api/api";
import apiUrls from "@api/apiUrls";
import { SignInFieldName } from "@models/auth/enums";
import { SignInResponse } from "@models/auth/types";
import { Sex } from "@models/common/enums";
import { EmployeeRole } from "@models/employee/enums";
import { EmployeeCurrentResponse, EmployeesResponse } from "@models/employee/types";
import { OrderApplicationCodeEnum, OrderStatusCodeEnum, TimeListActionType } from "@models/order/enums";
import {
    OrderCalculationResponse,
    OrderResponse,
    OrdersResponse,
    OrdersTimeListResponse,
    OrderWithLockResponse
} from "@models/order/types";
import { PassengerCategoryCodeEnum } from "@models/passenger/enums";
import { PassengersResponse } from "@models/passenger/types";

const mock = new MockAdapter(mockAxios, {
    delayResponse: 1000,
    onNoMatch: "passthrough"
});

mock.onPost(apiUrls.signIn(), {
    [SignInFieldName.PHONE]: "79999999991",
    [SignInFieldName.PASSWORD]: "pass"
}).reply(200, {
    role: EmployeeRole.EXECUTOR
});
mock.onPost(apiUrls.signIn(), {
    [SignInFieldName.PHONE]: "79999999992",
    [SignInFieldName.PASSWORD]: "pass"
}).reply(200, {
    role: EmployeeRole.OPERATOR
});
mock.onPost(apiUrls.signIn(), {
    [SignInFieldName.PHONE]: "79999999993",
    [SignInFieldName.PASSWORD]: "pass"
}).reply<SignInResponse>(200, {
    role: EmployeeRole.SPECIALIST
});
mock.onPost(apiUrls.signIn(), {
    [SignInFieldName.PHONE]: "79999999994",
    [SignInFieldName.PASSWORD]: "pass"
}).reply<SignInResponse>(200, {
    role: EmployeeRole.ADMIN
});
mock.onPost(apiUrls.refreshToken(), undefined).reply<SignInResponse>(200, {
    role: EmployeeRole.EXECUTOR
});

/* mock.onGet(apiUrls.employeesProfile()).reply<EmployeeCurrentResponse>(200, {
    id: 0,
    login: "+7 (999) 999-99-91",
    employeeRole: EmployeeRole.EXECUTOR,
    workPhone: "+7 (999) 999-99-91",
    personalPhone: "+7 (999) 999-99-19",
    firstName: "Иван",
    lastName: "Иванов",
    middleName: "Иванович",
    sex: Sex.MALE,
    shift: "08:00 - 20:00",
    employeeNumber: 123_456,
    lightDuties: false,
    rank: {
        code: "INSPECTOR",
        name: "Инспектор",
        shortName: "ЦИ"
    }
}); */

mock.onGet(apiUrls.employeesProfile()).reply<EmployeeCurrentResponse>(200, {
    id: 1,
    login: "+7 (999) 999-99-92",
    employeeRole: EmployeeRole.OPERATOR,
    workPhone: "+7 (999) 999-99-92",
    personalPhone: "+7 (999) 999-99-29",
    firstName: "Петр",
    lastName: "Петров",
    middleName: "Петрович",
    sex: Sex.MALE,
    shift: "20:00 - 08:00",
    employeeNumber: 654_321,
    lightDuties: false,
    rank: {
        code: "OPERATOR",
        name: "Оператор"
    }
});

mock.onGet(apiUrls.ordersCurrent()).reply<OrdersResponse>(200, {
    total: 1,
    list: [
        {
            id: 0,
            startDescription: "Встретить в фойе метро в центре станции Аэропорт",
            finishDescription: "Отвезти на станцию Университет до выхода 3",
            orderApplication: {
                code: OrderApplicationCodeEnum.PHONE,
                name: "Телефон"
            },
            duration: 3600,
            passengerCount: 2,
            maleEmployeeCount: 2,
            femaleEmployeeCount: 1,
            additionalInfo: "Пассажир в инвалидной коляске с одним сопровождающим",
            createdTime: "2024-06-07T13:30:00Z",
            orderTime: "2024-06-08T17:15:00Z",
            startTime: null,
            finishTime: null,
            absenceTime: null,
            cancelTime: null,
            orderStatus: {
                code: OrderStatusCodeEnum.ACCEPTED,
                name: "Принята"
            },
            passenger: {
                id: 0,
                firstName: "Михаил",
                lastName: "Гулкин",
                middleName: "Иванович",
                sex: Sex.MALE,
                comment: null,
                hasPacemaker: true,
                category: {
                    code: PassengerCategoryCodeEnum.IK,
                    name: "Инвалид колясочник",
                    shortName: "ИК"
                },
                phones: []
            },
            baggage: {
                type: "Чемодан",
                weight: 20,
                isHelpNeeded: true
            },
            transfers: [
                {
                    startStation: {
                        id: 0,
                        line: {
                            id: 2,
                            name: "2",
                            color: "#2DBE2C"
                        },
                        name: "Аэропорт"
                    },
                    finishStation: {
                        id: 3,
                        line: {
                            id: 2,
                            name: "2",
                            color: "#2DBE2C"
                        },
                        name: "Белорусская"
                    },
                    duration: 360,
                    isCrosswalking: false
                },
                {
                    startStation: {
                        id: 0,
                        line: {
                            id: 2,
                            name: "2",
                            color: "#2DBE2C"
                        },
                        name: "Белорусская"
                    },
                    finishStation: {
                        id: 4,
                        line: {
                            id: 4,
                            name: "5",
                            color: "#8D5B2D"
                        },
                        name: "Белорусская"
                    },
                    duration: 180,
                    isCrosswalking: true
                },
                {
                    startStation: {
                        id: 4,
                        line: {
                            id: 4,
                            name: "5",
                            color: "#8D5B2D"
                        },
                        name: "Белорусская"
                    },
                    finishStation: {
                        id: 5,
                        line: {
                            id: 5,
                            name: "5",
                            color: "#8D5B2D"
                        },
                        name: "Добрынинская"
                    },
                    duration: 720,
                    isCrosswalking: false
                },
                {
                    startStation: {
                        id: 5,
                        line: {
                            id: 4,
                            name: "5",
                            color: "#8D5B2D"
                        },
                        name: "Добрынинская"
                    },
                    finishStation: {
                        id: 6,
                        line: {
                            id: 8,
                            name: "9",
                            color: "#999999"
                        },
                        name: "Серпуховская"
                    },
                    duration: 180,
                    isCrosswalking: true
                },
                {
                    startStation: {
                        id: 6,
                        line: {
                            id: 8,
                            name: "9",
                            color: "#999999"
                        },
                        name: "Серпуховская"
                    },
                    finishStation: {
                        id: 7,
                        line: {
                            id: 8,
                            name: "9",
                            color: "#999999"
                        },
                        name: "Нагорная"
                    },
                    duration: 600,
                    isCrosswalking: false
                }
            ],
            passengerCategory: null,
            startStation: {
                id: 0,
                line: {
                    id: 1,
                    name: "2",
                    color: "#2DBE2C"
                },
                name: "Аэропорт"
            },
            finishStation: {
                id: 7,
                line: {
                    id: 8,
                    name: "9",
                    color: "#999999"
                },
                name: "Нагорная"
            }
        },
        {
            id: 1,
            startDescription: "Встретить у 2 выхода станции Бабушкинская",
            finishDescription: "Отвезти к 1 выходу станции Тверская",
            orderApplication: {
                code: OrderApplicationCodeEnum.ELECTRONIC_SERVICES,
                name: "Гос услуги"
            },
            duration: 3000,
            passengerCount: 10,
            maleEmployeeCount: 2,
            femaleEmployeeCount: 4,
            additionalInfo: "Группа детей дошкольного возраста",
            createdTime: "2024-06-07T13:30:00Z",
            orderTime: "2024-06-08T17:15:00Z",
            startTime: null,
            finishTime: null,
            absenceTime: null,
            cancelTime: null,
            orderStatus: {
                code: OrderStatusCodeEnum.REVIEW,
                name: "В рассмотрении"
            },
            passenger: {
                id: 0,
                firstName: "Светлана",
                lastName: "Смирнова",
                middleName: "Генадьевна",
                sex: Sex.FEMALE,
                comment: "Воспитатель группы",
                hasPacemaker: false,
                category: {
                    code: PassengerCategoryCodeEnum.OGD,
                    name: "Организованные группы детей",
                    shortName: "ОГД"
                },
                phones: []
            },
            baggage: null,
            transfers: [
                {
                    startStation: {
                        id: 13,
                        line: {
                            id: 5,
                            name: "6",
                            color: "#ED9121"
                        },
                        name: "Бабушкинская"
                    },
                    finishStation: {
                        id: 14,
                        line: {
                            id: 5,
                            name: "6",
                            color: "#ED9121"
                        },
                        name: "Третьяковская"
                    },
                    duration: 1500,
                    isCrosswalking: false
                },
                {
                    startStation: {
                        id: 14,
                        line: {
                            id: 5,
                            name: "6",
                            color: "#ED9121"
                        },
                        name: "Третьяковская"
                    },
                    finishStation: {
                        id: 15,
                        line: {
                            id: 1,
                            name: "2",
                            color: "#2DBE2C"
                        },
                        name: "Новокузнецкая"
                    },
                    duration: 180,
                    isCrosswalking: true
                },
                {
                    startStation: {
                        id: 15,
                        line: {
                            id: 1,
                            name: "2",
                            color: "#2DBE2C"
                        },
                        name: "Новокузнецкая"
                    },
                    finishStation: {
                        id: 16,
                        line: {
                            id: 1,
                            name: "2",
                            color: "#2DBE2C"
                        },
                        name: "Тверская"
                    },
                    duration: 300,
                    isCrosswalking: false
                }
            ],
            passengerCategory: null,
            startStation: {
                id: 13,
                line: {
                    id: 5,
                    name: "6",
                    color: "#ED9121"
                },
                name: "Бабушкинская"
            },
            finishStation: {
                id: 16,
                line: {
                    id: 1,
                    name: "2",
                    color: "#2DBE2C"
                },
                name: "Тверская"
            }
        },
        {
            id: 2,
            startDescription: "Встретить у 5 выхода станции Тверская",
            orderApplication: {
                code: OrderApplicationCodeEnum.PHONE,
                name: "Телефон"
            },
            duration: 2100,
            passengerCount: 1,
            maleEmployeeCount: 0,
            femaleEmployeeCount: 1,
            additionalInfo: null,
            createdTime: "2024-06-07T13:30:00Z",
            orderTime: "2024-06-08T18:45:00Z",
            startTime: null,
            finishTime: null,
            absenceTime: null,
            cancelTime: null,
            orderStatus: {
                code: OrderStatusCodeEnum.REVIEW,
                name: "В рассмотрении"
            },
            passenger: {
                id: 3,
                firstName: "Антон",
                lastName: "Андроник",
                middleName: "Сергеевич",
                sex: Sex.MALE,
                comment: null,
                hasPacemaker: false,
                category: {
                    code: PassengerCategoryCodeEnum.IS,
                    name: "Инвалид по слуху",
                    shortName: "ИС"
                },
                phones: []
            },
            baggage: null,
            transfers: [
                {
                    startStation: {
                        id: 14,
                        line: {
                            id: 1,
                            name: "2",
                            color: "#2DBE2C"
                        },
                        name: "Тверская"
                    },
                    finishStation: {
                        id: 23,
                        line: {
                            id: 1,
                            name: "2",
                            color: "#2DBE2C"
                        },
                        name: "Ховрино"
                    },
                    duration: 1800,
                    isCrosswalking: false
                }
            ],
            passengerCategory: null,
            startStation: {
                id: 14,
                line: {
                    id: 1,
                    name: "2",
                    color: "#2DBE2C"
                },
                name: "Тверская"
            },
            finishStation: {
                id: 23,
                line: {
                    id: 1,
                    name: "2",
                    color: "#2DBE2C"
                },
                name: "Ховрино"
            }
        }
    ]
});

mock.onGet(apiUrls.orders()).reply<OrdersResponse>(200, {
    total: 2,
    list: [
        {
            id: 0,
            startDescription: "Встретить в фойе метро в центре станции Аэропорт",
            finishDescription: "Отвезти на станцию Университет до выхода 3",
            orderApplication: {
                code: OrderApplicationCodeEnum.PHONE,
                name: "Телефон"
            },
            duration: 3600,
            passengerCount: 2,
            maleEmployeeCount: 2,
            femaleEmployeeCount: 1,
            additionalInfo: "Пассажир в инвалидной коляске с одним сопровождающим",
            createdTime: "2024-06-07T13:30:00Z",
            orderTime: "2024-06-08T17:15:00Z",
            startTime: null,
            finishTime: null,
            absenceTime: null,
            cancelTime: null,
            orderStatus: {
                code: OrderStatusCodeEnum.ACCEPTED,
                name: "Принята"
            },
            passenger: {
                id: 0,
                firstName: "Михаил",
                lastName: "Гулкин",
                middleName: "Иванович",
                sex: Sex.MALE,
                comment: null,
                hasPacemaker: true,
                category: {
                    code: PassengerCategoryCodeEnum.IK,
                    name: "Инвалид колясочник",
                    shortName: "ИК"
                },
                phones: []
            },
            baggage: {
                type: "Чемодан",
                weight: 20,
                isHelpNeeded: true
            },
            transfers: [
                {
                    startStation: {
                        id: 0,
                        line: {
                            id: 1,
                            name: "2",
                            color: "#2DBE2C"
                        },
                        name: "Аэропорт"
                    },
                    finishStation: {
                        id: 3,
                        line: {
                            id: 1,
                            name: "2",
                            color: "#2DBE2C"
                        },
                        name: "Белорусская"
                    },
                    duration: 360,
                    isCrosswalking: false
                },
                {
                    startStation: {
                        id: 0,
                        line: {
                            id: 1,
                            name: "2",
                            color: "#2DBE2C"
                        },
                        name: "Белорусская"
                    },
                    finishStation: {
                        id: 4,
                        line: {
                            id: 4,
                            name: "5",
                            color: "#8D5B2D"
                        },
                        name: "Белорусская"
                    },
                    duration: 180,
                    isCrosswalking: true
                },
                {
                    startStation: {
                        id: 4,
                        line: {
                            id: 4,
                            name: "5",
                            color: "#8D5B2D"
                        },
                        name: "Белорусская"
                    },
                    finishStation: {
                        id: 5,
                        line: {
                            id: 4,
                            name: "5",
                            color: "#8D5B2D"
                        },
                        name: "Добрынинская"
                    },
                    duration: 720,
                    isCrosswalking: false
                },
                {
                    startStation: {
                        id: 5,
                        line: {
                            id: 4,
                            name: "5",
                            color: "#8D5B2D"
                        },
                        name: "Добрынинская"
                    },
                    finishStation: {
                        id: 6,
                        line: {
                            id: 8,
                            name: "9",
                            color: "#999999"
                        },
                        name: "Серпуховская"
                    },
                    duration: 180,
                    isCrosswalking: true
                },
                {
                    startStation: {
                        id: 6,
                        line: {
                            id: 8,
                            name: "9",
                            color: "#999999"
                        },
                        name: "Серпуховская"
                    },
                    finishStation: {
                        id: 7,
                        line: {
                            id: 8,
                            name: "9",
                            color: "#999999"
                        },
                        name: "Нагорная"
                    },
                    duration: 600,
                    isCrosswalking: false
                }
            ],
            passengerCategory: null,
            startStation: {
                id: 0,
                line: {
                    id: 1,
                    name: "2",
                    color: "#2DBE2C"
                },
                name: "Аэропорт"
            },
            finishStation: {
                id: 7,
                line: {
                    id: 8,
                    name: "9",
                    color: "#999999"
                },
                name: "Нагорная"
            }
        },
        {
            id: 1,
            startDescription: "Встретить у 2 выхода станции Бабушкинская",
            finishDescription: "Отвезти к 1 выходу станции Тверская",
            orderApplication: {
                code: OrderApplicationCodeEnum.ELECTRONIC_SERVICES,
                name: "Гос услуги"
            },
            duration: 3000,
            passengerCount: 10,
            maleEmployeeCount: 2,
            femaleEmployeeCount: 4,
            additionalInfo: "Группа детей дошкольного возраста",
            createdTime: "2024-06-07T13:30:00Z",
            orderTime: "2024-06-08T17:15:00Z",
            startTime: null,
            finishTime: null,
            absenceTime: null,
            cancelTime: null,
            orderStatus: {
                code: OrderStatusCodeEnum.REVIEW,
                name: "В рассмотрении"
            },
            passenger: {
                id: 0,
                firstName: "Светлана",
                lastName: "Смирнова",
                middleName: "Генадьевна",
                sex: Sex.FEMALE,
                comment: "Воспитатель группы",
                hasPacemaker: false,
                category: {
                    code: PassengerCategoryCodeEnum.OGD,
                    name: "Организованные группы детей",
                    shortName: "ОГД"
                },
                phones: []
            },
            baggage: null,
            transfers: [
                {
                    startStation: {
                        id: 13,
                        line: {
                            id: 5,
                            name: "6",
                            color: "#ED9121"
                        },
                        name: "Бабушкинская"
                    },
                    finishStation: {
                        id: 14,
                        line: {
                            id: 5,
                            name: "6",
                            color: "#ED9121"
                        },
                        name: "Третьяковская"
                    },
                    duration: 1500,
                    isCrosswalking: false
                },
                {
                    startStation: {
                        id: 14,
                        line: {
                            id: 5,
                            name: "6",
                            color: "#ED9121"
                        },
                        name: "Третьяковская"
                    },
                    finishStation: {
                        id: 15,
                        line: {
                            id: 1,
                            name: "2",
                            color: "#2DBE2C"
                        },
                        name: "Новокузнецкая"
                    },
                    duration: 180,
                    isCrosswalking: true
                },
                {
                    startStation: {
                        id: 15,
                        line: {
                            id: 1,
                            name: "2",
                            color: "#2DBE2C"
                        },
                        name: "Новокузнецкая"
                    },
                    finishStation: {
                        id: 16,
                        line: {
                            id: 1,
                            name: "2",
                            color: "#2DBE2C"
                        },
                        name: "Тверская"
                    },
                    duration: 300,
                    isCrosswalking: false
                }
            ],
            passengerCategory: null,
            startStation: {
                id: 13,
                line: {
                    id: 5,
                    name: "6",
                    color: "#ED9121"
                },
                name: "Бабушкинская"
            },
            finishStation: {
                id: 16,
                line: {
                    id: 1,
                    name: "2",
                    color: "#2DBE2C"
                },
                name: "Тверская"
            }
        }
    ]
});

mock.onGet(apiUrls.ordersTimeList()).reply<OrdersTimeListResponse>(200, {
    total: 1,
    list: [
        {
            employee: {
                id: 0,
                employeeRole: EmployeeRole.EXECUTOR,
                workPhone: "+7 (999) 999-99-91",
                personalPhone: "+7 (999) 999-99-19",
                firstName: "Иван",
                lastName: "Иванов",
                middleName: "Иванович",
                sex: Sex.MALE,
                shift: "08:00 - 20:00",
                employeeNumber: 123_456,
                lightDuties: false,
                rank: {
                    code: "INSPECTOR",
                    name: "Инспектор",
                    shortName: "ЦИ"
                }
            },
            actions: [
                {
                    timeStart: "2024-06-08T02:30:00Z",
                    timeEnd: "2024-06-08T04:30:00Z",
                    actionType: TimeListActionType.NON_WORKING
                },
                {
                    timeStart: "2024-06-08T04:30:00Z",
                    timeEnd: "2024-06-08T05:00:00Z",
                    actionType: TimeListActionType.TRANSFER
                },
                {
                    timeStart: "2024-06-08T05:00:00Z",
                    timeEnd: "2024-06-08T06:30:00Z",
                    order: {
                        id: 2,
                        startDescription: "Встретить у 1 выхода станции Ховрино",
                        finishDescription: "Отвезти к 4 выходу станции Алма-Атинская",
                        orderApplication: {
                            code: OrderApplicationCodeEnum.PHONE,
                            name: "Телефон"
                        },
                        duration: 4500,
                        passengerCount: 1,
                        maleEmployeeCount: 0,
                        femaleEmployeeCount: 1,
                        additionalInfo: null,
                        createdTime: "2024-06-07T13:30:00Z",
                        orderTime: "2024-06-08T05:15:00Z",
                        startTime: null,
                        finishTime: null,
                        absenceTime: null,
                        cancelTime: null,
                        orderStatus: {
                            code: OrderStatusCodeEnum.ACCEPTED,
                            name: "Принята"
                        },
                        passenger: {
                            id: 123,
                            firstName: "Михаил",
                            lastName: "Свирдлов",
                            middleName: "Семенович",
                            sex: Sex.MALE,
                            comment: null,
                            hasPacemaker: false,
                            category: {
                                code: PassengerCategoryCodeEnum.IZT,
                                name: "Инвалид по зрению",
                                shortName: "ИЗТ"
                            },
                            phones: []
                        },
                        baggage: null,
                        transfers: [],
                        passengerCategory: null,
                        startStation: {
                            id: 21,
                            line: {
                                id: 1,
                                name: "2",
                                color: "#2DBE2C"
                            },
                            name: "Ховрино"
                        },
                        finishStation: {
                            id: 21,
                            line: {
                                id: 1,
                                name: "2",
                                color: "#2DBE2C"
                            },
                            name: "Алма-Атинская"
                        }
                    },
                    actionType: TimeListActionType.ORDER
                },
                {
                    timeStart: "2024-06-08T06:30:00Z",
                    timeEnd: "2024-06-08T07:00:00Z",
                    actionType: TimeListActionType.TRANSFER
                },
                {
                    timeStart: "2024-06-08T07:00:00Z",
                    timeEnd: "2024-06-08T09:00:00Z",
                    actionType: TimeListActionType.DOWNTIME
                },
                {
                    timeStart: "2024-06-08T09:00:00Z",
                    timeEnd: "2024-06-08T09:15:00Z",
                    actionType: TimeListActionType.TRANSFER
                },
                {
                    timeStart: "2024-06-08T09:15:00Z",
                    timeEnd: "2024-06-08T10:00:00Z",
                    order: {
                        id: 3,
                        startDescription: "Встретить у 1 выхода станции Ховрино",
                        finishDescription: "Отвезти к 4 выходу станции Алма-Атинская",
                        orderApplication: {
                            code: OrderApplicationCodeEnum.PHONE,
                            name: "Телефон"
                        },
                        duration: 4500,
                        passengerCount: 1,
                        maleEmployeeCount: 0,
                        femaleEmployeeCount: 1,
                        additionalInfo: null,
                        createdTime: "2024-06-07T13:30:00Z",
                        orderTime: "2024-06-08T05:15:00Z",
                        startTime: null,
                        finishTime: null,
                        absenceTime: null,
                        cancelTime: null,
                        orderStatus: {
                            code: OrderStatusCodeEnum.ACCEPTED,
                            name: "Принята"
                        },
                        passenger: {
                            id: 123,
                            firstName: "Михаил",
                            lastName: "Свирдлов",
                            middleName: "Семенович",
                            sex: Sex.MALE,
                            comment: null,
                            hasPacemaker: false,
                            category: {
                                code: PassengerCategoryCodeEnum.IZT,
                                name: "Инвалид по зрению",
                                shortName: "ИЗТ"
                            },
                            phones: []
                        },
                        baggage: null,
                        transfers: [],
                        passengerCategory: null,
                        startStation: {
                            id: 21,
                            line: {
                                id: 1,
                                name: "2",
                                color: "#2DBE2C"
                            },
                            name: "Ховрино"
                        },
                        finishStation: {
                            id: 21,
                            line: {
                                id: 1,
                                name: "2",
                                color: "#2DBE2C"
                            },
                            name: "Алма-Атинская"
                        }
                    },
                    actionType: TimeListActionType.ORDER
                },
                {
                    timeStart: "2024-06-08T10:00:00Z",
                    timeEnd: "2024-06-08T10:15:00Z",
                    actionType: TimeListActionType.TRANSFER
                },
                {
                    timeStart: "2024-06-08T10:15:00Z",
                    timeEnd: "2024-06-08T11:00:00Z",
                    actionType: TimeListActionType.BREAK
                },
                {
                    timeStart: "2024-06-08T11:00:00Z",
                    timeEnd: "2024-06-08T11:30:00Z",
                    actionType: TimeListActionType.TRANSFER
                },
                {
                    timeStart: "2024-06-08T11:30:00Z",
                    timeEnd: "2024-06-08T13:00:00Z",
                    order: {
                        id: 4,
                        startDescription: "Встретить у 1 выхода станции Ховрино",
                        finishDescription: "Отвезти к 4 выходу станции Алма-Атинская",
                        orderApplication: {
                            code: OrderApplicationCodeEnum.PHONE,
                            name: "Телефон"
                        },
                        duration: 4500,
                        passengerCount: 1,
                        maleEmployeeCount: 0,
                        femaleEmployeeCount: 1,
                        additionalInfo: null,
                        createdTime: "2024-06-07T13:30:00Z",
                        orderTime: "2024-06-08T05:15:00Z",
                        startTime: null,
                        finishTime: null,
                        absenceTime: null,
                        cancelTime: null,
                        orderStatus: {
                            code: OrderStatusCodeEnum.ACCEPTED,
                            name: "Принята"
                        },
                        passenger: {
                            id: 123,
                            firstName: "Михаил",
                            lastName: "Свирдлов",
                            middleName: "Семенович",
                            sex: Sex.MALE,
                            comment: null,
                            hasPacemaker: false,
                            category: {
                                code: PassengerCategoryCodeEnum.IZT,
                                name: "Инвалид по зрению",
                                shortName: "ИЗТ"
                            },
                            phones: []
                        },
                        baggage: null,
                        transfers: [],
                        passengerCategory: null,
                        startStation: {
                            id: 21,
                            line: {
                                id: 1,
                                name: "2",
                                color: "#2DBE2C"
                            },
                            name: "Ховрино"
                        },
                        finishStation: {
                            id: 21,
                            line: {
                                id: 1,
                                name: "2",
                                color: "#2DBE2C"
                            },
                            name: "Алма-Атинская"
                        }
                    },
                    actionType: TimeListActionType.ORDER
                },
                {
                    timeStart: "2024-06-08T13:00:00Z",
                    timeEnd: "2024-06-08T13:30:00Z",
                    actionType: TimeListActionType.TRANSFER
                },
                {
                    timeStart: "2024-06-08T13:30:00Z",
                    timeEnd: "2024-06-08T14:00:00Z",
                    actionType: TimeListActionType.DOWNTIME
                },
                {
                    timeStart: "2024-06-08T14:00:00Z",
                    timeEnd: "2024-06-08T14:30:00Z",
                    actionType: TimeListActionType.TRANSFER
                },
                {
                    timeStart: "2024-06-08T14:30:00Z",
                    timeEnd: "2024-06-08T16:00:00Z",
                    order: {
                        id: 5,
                        startDescription: "Встретить у 1 выхода станции Ховрино",
                        finishDescription: "Отвезти к 4 выходу станции Алма-Атинская",
                        orderApplication: {
                            code: OrderApplicationCodeEnum.PHONE,
                            name: "Телефон"
                        },
                        duration: 4500,
                        passengerCount: 1,
                        maleEmployeeCount: 0,
                        femaleEmployeeCount: 1,
                        additionalInfo: null,
                        createdTime: "2024-06-07T13:30:00Z",
                        orderTime: "2024-06-08T05:15:00Z",
                        startTime: null,
                        finishTime: null,
                        absenceTime: null,
                        cancelTime: null,
                        orderStatus: {
                            code: OrderStatusCodeEnum.ACCEPTED,
                            name: "Принята"
                        },
                        passenger: {
                            id: 123,
                            firstName: "Михаил",
                            lastName: "Свирдлов",
                            middleName: "Семенович",
                            sex: Sex.MALE,
                            comment: null,
                            hasPacemaker: false,
                            category: {
                                code: PassengerCategoryCodeEnum.IZT,
                                name: "Инвалид по зрению",
                                shortName: "ИЗТ"
                            },
                            phones: []
                        },
                        baggage: null,
                        transfers: [],
                        passengerCategory: null,
                        startStation: {
                            id: 21,
                            line: {
                                id: 1,
                                name: "2",
                                color: "#2DBE2C"
                            },
                            name: "Ховрино"
                        },
                        finishStation: {
                            id: 21,
                            line: {
                                id: 1,
                                name: "2",
                                color: "#2DBE2C"
                            },
                            name: "Алма-Атинская"
                        }
                    },
                    actionType: TimeListActionType.ORDER
                },
                {
                    timeStart: "2024-06-08T16:00:00Z",
                    timeEnd: "2024-06-08T16:15:00Z",
                    actionType: TimeListActionType.DOWNTIME
                },
                {
                    timeStart: "2024-06-08T16:15:00Z",
                    timeEnd: "2024-06-08T17:00:00Z",
                    order: {
                        id: 6,
                        startDescription: "Встретить у 1 выхода станции Ховрино",
                        finishDescription: "Отвезти к 4 выходу станции Алма-Атинская",
                        orderApplication: {
                            code: OrderApplicationCodeEnum.PHONE,
                            name: "Телефон"
                        },
                        duration: 4500,
                        passengerCount: 1,
                        maleEmployeeCount: 0,
                        femaleEmployeeCount: 1,
                        additionalInfo: null,
                        createdTime: "2024-06-07T13:30:00Z",
                        orderTime: "2024-06-08T05:15:00Z",
                        startTime: null,
                        finishTime: null,
                        absenceTime: null,
                        cancelTime: null,
                        orderStatus: {
                            code: OrderStatusCodeEnum.ACCEPTED,
                            name: "Принята"
                        },
                        passenger: {
                            id: 123,
                            firstName: "Михаил",
                            lastName: "Свирдлов",
                            middleName: "Семенович",
                            sex: Sex.MALE,
                            comment: null,
                            hasPacemaker: false,
                            category: {
                                code: PassengerCategoryCodeEnum.IZT,
                                name: "Инвалид по зрению",
                                shortName: "ИЗТ"
                            },
                            phones: []
                        },
                        baggage: null,
                        transfers: [],
                        passengerCategory: null,
                        startStation: {
                            id: 21,
                            line: {
                                id: 1,
                                name: "2",
                                color: "#2DBE2C"
                            },
                            name: "Ховрино"
                        },
                        finishStation: {
                            id: 21,
                            line: {
                                id: 1,
                                name: "2",
                                color: "#2DBE2C"
                            },
                            name: "Алма-Атинская"
                        }
                    },
                    actionType: TimeListActionType.ORDER
                },
                {
                    timeStart: "2024-06-08T17:00:00Z",
                    timeEnd: "2024-06-08T22:00:00Z",
                    actionType: TimeListActionType.NON_WORKING
                }
            ]
        }
    ]
});

mock.onGet(apiUrls.ordersId(0)).reply<OrderWithLockResponse>(200, {
    isLockedForEdit: true,
    data: {
        id: 0,
        startDescription: "Встретить в фойе метро в центре станции Аэропорт",
        finishDescription: "Отвезти на станцию Университет до выхода 3",
        orderApplication: {
            code: OrderApplicationCodeEnum.PHONE,
            name: "Телефон"
        },
        duration: 3600,
        passengerCount: 2,
        maleEmployeeCount: 2,
        femaleEmployeeCount: 1,
        additionalInfo: "Пассажир в инвалидной коляске с одним сопровождающим",
        createdTime: "2024-06-07T13:30:00Z",
        orderTime: "2024-06-08T17:15:00Z",
        startTime: null,
        finishTime: null,
        absenceTime: null,
        cancelTime: null,
        orderStatus: {
            code: OrderStatusCodeEnum.ACCEPTED,
            name: "Принята"
        },
        passenger: {
            id: 0,
            firstName: "Михаил",
            lastName: "Гулкин",
            middleName: "Иванович",
            sex: Sex.MALE,
            comment: null,
            hasPacemaker: true,
            category: {
                code: PassengerCategoryCodeEnum.IK,
                name: "Инвалид колясочник",
                shortName: "ИК"
            },
            phones: [
                {
                    phone: "79991234567",
                    description: "Основной телефон"
                },
                {
                    phone: "79997654321",
                    description: "Телефон сиделки"
                }
            ]
        },
        baggage: {
            type: "Чемодан",
            weight: 20,
            isHelpNeeded: true
        },
        transfers: [
            {
                startStation: {
                    id: 0,
                    line: {
                        id: 2,
                        name: "2",
                        color: "#2DBE2C"
                    },
                    name: "Аэропорт"
                },
                finishStation: {
                    id: 3,
                    line: {
                        id: 2,
                        name: "2",
                        color: "#2DBE2C"
                    },
                    name: "Белорусская"
                },
                duration: 360,
                isCrosswalking: false
            },
            {
                startStation: {
                    id: 0,
                    line: {
                        id: 2,
                        name: "2",
                        color: "#2DBE2C"
                    },
                    name: "Белорусская"
                },
                finishStation: {
                    id: 4,
                    line: {
                        id: 4,
                        name: "5",
                        color: "#8D5B2D"
                    },
                    name: "Белорусская"
                },
                duration: 180,
                isCrosswalking: true
            },
            {
                startStation: {
                    id: 4,
                    line: {
                        id: 4,
                        name: "5",
                        color: "#8D5B2D"
                    },
                    name: "Белорусская"
                },
                finishStation: {
                    id: 5,
                    line: {
                        id: 5,
                        name: "5",
                        color: "#8D5B2D"
                    },
                    name: "Добрынинская"
                },
                duration: 720,
                isCrosswalking: false
            },
            {
                startStation: {
                    id: 5,
                    line: {
                        id: 4,
                        name: "5",
                        color: "#8D5B2D"
                    },
                    name: "Добрынинская"
                },
                finishStation: {
                    id: 6,
                    line: {
                        id: 8,
                        name: "9",
                        color: "#999999"
                    },
                    name: "Серпуховская"
                },
                duration: 180,
                isCrosswalking: true
            },
            {
                startStation: {
                    id: 6,
                    line: {
                        id: 8,
                        name: "9",
                        color: "#999999"
                    },
                    name: "Серпуховская"
                },
                finishStation: {
                    id: 7,
                    line: {
                        id: 8,
                        name: "9",
                        color: "#999999"
                    },
                    name: "Нагорная"
                },
                duration: 600,
                isCrosswalking: false
            }
        ],
        passengerCategory: null,
        startStation: {
            id: 0,
            line: {
                id: 1,
                name: "2",
                color: "#2DBE2C"
            },
            name: "Аэропорт"
        },
        finishStation: {
            id: 7,
            line: {
                id: 8,
                name: "9",
                color: "#999999"
            },
            name: "Нагорная"
        },
        employees: [
            {
                id: 0,
                employeeRole: EmployeeRole.EXECUTOR,
                workPhone: "+7 (999) 999-99-91",
                personalPhone: "+7 (999) 999-99-19",
                firstName: "Иван",
                lastName: "Иванов",
                middleName: "Иванович",
                sex: Sex.MALE,
                shift: "08:00 - 20:00",
                employeeNumber: 123_456,
                lightDuties: false,
                rank: {
                    code: "INSPECTOR",
                    name: "Инспектор",
                    shortName: "ЦИ"
                }
            },
            {
                id: 1,
                employeeRole: EmployeeRole.EXECUTOR,
                workPhone: "+7 (999) 999-99-91",
                personalPhone: "+7 (999) 999-99-19",
                firstName: "Иван",
                lastName: "Иванов",
                middleName: "Иванович",
                sex: Sex.MALE,
                shift: "08:00 - 20:00",
                employeeNumber: 123_456,
                lightDuties: false,
                rank: {
                    code: "INSPECTOR",
                    name: "Инспектор",
                    shortName: "ЦИ"
                }
            }
        ]
    }
});

mock.onGet(apiUrls.passengers()).reply<PassengersResponse>(200, {
    total: 2,
    list: [
        {
            id: 0,
            firstName: "Михаил",
            lastName: "Гулкин",
            middleName: "Иванович",
            sex: Sex.MALE,
            comment: null,
            hasPacemaker: true,
            category: {
                code: PassengerCategoryCodeEnum.IK,
                name: "Инвалид колясочник",
                shortName: "ИК"
            },
            phones: [
                {
                    phone: "79991234567",
                    description: "Основной телефон"
                },
                {
                    phone: "79997654321",
                    description: "Телефон сиделки"
                }
            ]
        },
        {
            id: 1,
            firstName: "Александр",
            lastName: "Лукин",
            middleName: "Михайлович",
            sex: Sex.MALE,
            comment: null,
            hasPacemaker: true,
            category: {
                code: PassengerCategoryCodeEnum.DI,
                name: "Ребенок инвалид",
                shortName: "ДИ"
            },
            phones: [
                {
                    phone: "79917889899",
                    description: "Телефон матери"
                }
            ]
        }
    ]
});

mock.onGet(apiUrls.employees()).reply<EmployeesResponse>(200, {
    total: 2,
    list: [
        {
            id: 0,
            employeeRole: EmployeeRole.EXECUTOR,
            workPhone: "+7 (999) 999-99-91",
            personalPhone: "+7 (999) 999-99-19",
            firstName: "Иван",
            lastName: "Иванов",
            middleName: "Иванович",
            sex: Sex.MALE,
            shift: "08:00 - 20:00",
            employeeNumber: 123_456,
            lightDuties: false,
            rank: {
                code: "INSPECTOR",
                name: "Инспектор",
                shortName: "ЦИ"
            }
        },
        {
            id: 1,
            employeeRole: EmployeeRole.EXECUTOR,
            workPhone: "+7 (999) 999-99-94",
            personalPhone: "+7 (999) 999-99-49",
            firstName: "Петр",
            lastName: "Петров",
            middleName: "Петрович",
            sex: Sex.MALE,
            shift: "07:00 - 19:00",
            employeeNumber: 134_780,
            lightDuties: true,
            rank: {
                code: "INSPECTOR",
                name: "Инспектор",
                shortName: "ЦИ"
            }
        }
    ]
});

mock.onPost(apiUrls.ordersCalculation()).reply<OrderCalculationResponse>(200, {
    duration: 45,
    transfers: [
        {
            startStation: {
                id: 0,
                line: {
                    id: 2,
                    name: "2",
                    color: "#2DBE2C"
                },
                name: "Аэропорт"
            },
            finishStation: {
                id: 3,
                line: {
                    id: 2,
                    name: "2",
                    color: "#2DBE2C"
                },
                name: "Белорусская"
            },
            duration: 360,
            isCrosswalking: false
        },
        {
            startStation: {
                id: 0,
                line: {
                    id: 2,
                    name: "2",
                    color: "#2DBE2C"
                },
                name: "Белорусская"
            },
            finishStation: {
                id: 4,
                line: {
                    id: 4,
                    name: "5",
                    color: "#8D5B2D"
                },
                name: "Белорусская"
            },
            duration: 180,
            isCrosswalking: true
        },
        {
            startStation: {
                id: 4,
                line: {
                    id: 4,
                    name: "5",
                    color: "#8D5B2D"
                },
                name: "Белорусская"
            },
            finishStation: {
                id: 5,
                line: {
                    id: 5,
                    name: "5",
                    color: "#8D5B2D"
                },
                name: "Добрынинская"
            },
            duration: 720,
            isCrosswalking: false
        },
        {
            startStation: {
                id: 5,
                line: {
                    id: 4,
                    name: "5",
                    color: "#8D5B2D"
                },
                name: "Добрынинская"
            },
            finishStation: {
                id: 6,
                line: {
                    id: 8,
                    name: "9",
                    color: "#999999"
                },
                name: "Серпуховская"
            },
            duration: 180,
            isCrosswalking: true
        },
        {
            startStation: {
                id: 6,
                line: {
                    id: 8,
                    name: "9",
                    color: "#999999"
                },
                name: "Серпуховская"
            },
            finishStation: {
                id: 7,
                line: {
                    id: 8,
                    name: "9",
                    color: "#999999"
                },
                name: "Нагорная"
            },
            duration: 600,
            isCrosswalking: false
        }
    ]
});

mock.onPut(apiUrls.ordersIdStatus(0), { status: OrderStatusCodeEnum.RIDE }).reply<OrderResponse>(200, {
    id: 0,
    startDescription: "Встретить в фойе метро в центре станции Аэропорт",
    finishDescription: "Отвезти на станцию Университет до выхода 3",
    orderApplication: {
        code: OrderApplicationCodeEnum.PHONE,
        name: "Телефон"
    },
    duration: 3600,
    passengerCount: 2,
    maleEmployeeCount: 2,
    femaleEmployeeCount: 1,
    additionalInfo: "Пассажир в инвалидной коляске с одним сопровождающим",
    createdTime: "2024-06-07T13:30:00Z",
    orderTime: "2024-06-08T17:15:00Z",
    startTime: null,
    finishTime: null,
    absenceTime: null,
    cancelTime: null,
    orderStatus: {
        code: OrderStatusCodeEnum.RIDE,
        name: "Поездка"
    },
    passenger: {
        id: 0,
        firstName: "Михаил",
        lastName: "Гулкин",
        middleName: "Иванович",
        sex: Sex.MALE,
        comment: null,
        hasPacemaker: true,
        category: {
            code: PassengerCategoryCodeEnum.IK,
            name: "Инвалид колясочник",
            shortName: "ИК"
        },
        phones: []
    },
    baggage: {
        type: "Чемодан",
        weight: 20,
        isHelpNeeded: true
    },
    transfers: [
        {
            startStation: {
                id: 0,
                line: {
                    id: 2,
                    name: "2",
                    color: "#2DBE2C"
                },
                name: "Аэропорт"
            },
            finishStation: {
                id: 3,
                line: {
                    id: 2,
                    name: "2",
                    color: "#2DBE2C"
                },
                name: "Белорусская"
            },
            duration: 360,
            isCrosswalking: false
        },
        {
            startStation: {
                id: 0,
                line: {
                    id: 2,
                    name: "2",
                    color: "#2DBE2C"
                },
                name: "Белорусская"
            },
            finishStation: {
                id: 4,
                line: {
                    id: 4,
                    name: "5",
                    color: "#8D5B2D"
                },
                name: "Белорусская"
            },
            duration: 180,
            isCrosswalking: true
        },
        {
            startStation: {
                id: 4,
                line: {
                    id: 4,
                    name: "5",
                    color: "#8D5B2D"
                },
                name: "Белорусская"
            },
            finishStation: {
                id: 5,
                line: {
                    id: 5,
                    name: "5",
                    color: "#8D5B2D"
                },
                name: "Добрынинская"
            },
            duration: 720,
            isCrosswalking: false
        },
        {
            startStation: {
                id: 5,
                line: {
                    id: 4,
                    name: "5",
                    color: "#8D5B2D"
                },
                name: "Добрынинская"
            },
            finishStation: {
                id: 6,
                line: {
                    id: 8,
                    name: "9",
                    color: "#999999"
                },
                name: "Серпуховская"
            },
            duration: 180,
            isCrosswalking: true
        },
        {
            startStation: {
                id: 6,
                line: {
                    id: 8,
                    name: "9",
                    color: "#999999"
                },
                name: "Серпуховская"
            },
            finishStation: {
                id: 7,
                line: {
                    id: 8,
                    name: "9",
                    color: "#999999"
                },
                name: "Нагорная"
            },
            duration: 600,
            isCrosswalking: false
        }
    ],
    passengerCategory: null,
    startStation: {
        id: 0,
        line: {
            id: 1,
            name: "2",
            color: "#2DBE2C"
        },
        name: "Аэропорт"
    },
    finishStation: {
        id: 7,
        line: {
            id: 8,
            name: "9",
            color: "#999999"
        },
        name: "Нагорная"
    }
});
