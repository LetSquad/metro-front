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
    total: 4,
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
        },
        {
            id: 3,
            orderApplication: {
                code: OrderApplicationCodeEnum.PHONE,
                name: "Телефон"
            },
            startDescription: "Встретить у ТЦ Дискавери",
            duration: 3000,
            passengerCount: 1,
            maleEmployeeCount: 1,
            femaleEmployeeCount: 1,
            additionalInfo: null,
            createdTime: "2024-06-07T13:33:00Z",
            orderTime: "2024-06-08T19:30:00Z",
            startTime: null,
            finishTime: null,
            absenceTime: null,
            cancelTime: null,
            orderStatus: {
                code: OrderStatusCodeEnum.REVIEW,
                name: "В рассмотрении"
            },
            passenger: {
                id: 4,
                firstName: "Федор",
                lastName: "Вжик",
                middleName: "Михайлович",
                sex: Sex.MALE,
                comment: null,
                hasPacemaker: false,
                category: {
                    code: PassengerCategoryCodeEnum.IO,
                    name: "Инвалид опорник",
                    shortName: "ИО"
                },
                phones: []
            },
            baggage: {
                type: "Сумка",
                weight: 8,
                isHelpNeeded: true
            },
            transfers: [
                {
                    startStation: {
                        id: 23,
                        line: {
                            id: 1,
                            name: "2",
                            color: "#2DBE2C"
                        },
                        name: "Ховрино"
                    },
                    finishStation: {
                        id: 27,
                        line: {
                            id: 1,
                            name: "2",
                            color: "#2DBE2C"
                        },
                        name: "Технопарк"
                    },
                    duration: 2340,
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
                name: "Ховрино"
            },
            finishStation: {
                id: 23,
                line: {
                    id: 1,
                    name: "2",
                    color: "#2DBE2C"
                },
                name: "Технопарк"
            }
        }
    ]
});

mock.onGet(apiUrls.orders()).reply<OrdersResponse>(200, {
    total: 4,
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
        },
        {
            id: 3,
            orderApplication: {
                code: OrderApplicationCodeEnum.PHONE,
                name: "Телефон"
            },
            startDescription: "Встретить у ТЦ Дискавери",
            duration: 3000,
            passengerCount: 1,
            maleEmployeeCount: 1,
            femaleEmployeeCount: 1,
            additionalInfo: null,
            createdTime: "2024-06-07T13:33:00Z",
            orderTime: "2024-06-08T19:30:00Z",
            startTime: null,
            finishTime: null,
            absenceTime: null,
            cancelTime: null,
            orderStatus: {
                code: OrderStatusCodeEnum.REVIEW,
                name: "В рассмотрении"
            },
            passenger: {
                id: 4,
                firstName: "Федор",
                lastName: "Вжик",
                middleName: "Михайлович",
                sex: Sex.MALE,
                comment: null,
                hasPacemaker: false,
                category: {
                    code: PassengerCategoryCodeEnum.IO,
                    name: "Инвалид опорник",
                    shortName: "ИО"
                },
                phones: []
            },
            baggage: {
                type: "Сумка",
                weight: 8,
                isHelpNeeded: true
            },
            transfers: [
                {
                    startStation: {
                        id: 23,
                        line: {
                            id: 1,
                            name: "2",
                            color: "#2DBE2C"
                        },
                        name: "Ховрино"
                    },
                    finishStation: {
                        id: 27,
                        line: {
                            id: 1,
                            name: "2",
                            color: "#2DBE2C"
                        },
                        name: "Технопарк"
                    },
                    duration: 2340,
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
                name: "Ховрино"
            },
            finishStation: {
                id: 23,
                line: {
                    id: 1,
                    name: "2",
                    color: "#2DBE2C"
                },
                name: "Технопарк"
            }
        }
    ]
});

mock.onGet(apiUrls.ordersTimeList()).reply<OrdersTimeListResponse>(200, {
    total: 1,
    list: [
        {
            employee: {
                id: 682,
                employeeRole: EmployeeRole.EXECUTOR,
                workPhone: "79876543892",
                personalPhone: null,
                firstName: "М",
                lastName: "Исаев",
                middleName: "М",
                sex: Sex.MALE,
                shift: "08:00-16:00",
                employeeNumber: 682,
                lightDuties: false,
                rank: {
                    code: "INSPECTOR",
                    name: "Инспектор",
                    shortName: "ЦИ"
                }
            },
            actions: [
                {
                    timeStart: "2024-04-24T02:30:00Z",
                    timeEnd: "2024-04-24T05:00:00Z",
                    actionType: TimeListActionType.NON_WORKING,
                    order: null
                },
                {
                    timeStart: "2024-04-24T05:00:00Z",
                    timeEnd: "2024-04-24T05:50:00Z",
                    actionType: TimeListActionType.DOWNTIME,
                    order: null
                },
                {
                    timeStart: "2024-04-24T05:50:00Z",
                    timeEnd: "2024-04-24T06:57:00Z",
                    actionType: TimeListActionType.ORDER,
                    order: {
                        id: 487_616,
                        startDescription: null,
                        finishDescription: null,
                        orderApplication: null,
                        duration: 4020,
                        passengerCount: 1,
                        maleEmployeeCount: 4,
                        femaleEmployeeCount: 0,
                        additionalInfo: null,
                        orderTime: "2024-04-24T08:50:00Z",
                        startTime: "2024-04-24T08:45:28Z",
                        finishTime: "2024-04-24T09:47:12Z",
                        absenceTime: null,
                        cancelTime: null,
                        orderStatus: {
                            code: OrderStatusCodeEnum.COMPLETED,
                            name: "Заявка закончена"
                        },
                        passenger: {
                            id: 24_159,
                            firstName: "Иван 24159",
                            lastName: "Иванов",
                            middleName: null,
                            sex: Sex.MALE,
                            comment: null,
                            hasPacemaker: false,
                            category: {
                                code: PassengerCategoryCodeEnum.DI,
                                name: "Ребенок инвалид",
                                shortName: "ДИ"
                            },
                            phones: []
                        },
                        baggage: null,
                        transfers: [],
                        passengerCategory: {
                            code: PassengerCategoryCodeEnum.DI,
                            name: "Ребенок инвалид",
                            shortName: "ДИ"
                        },
                        startStation: {
                            id: 48,
                            name: "Мякинино",
                            line: {
                                id: 3,
                                name: "3",
                                color: "#0078BE"
                            }
                        },
                        finishStation: {
                            id: 109,
                            name: "Новые Черёмушки",
                            line: {
                                id: 6,
                                name: "6",
                                color: "#ED9121"
                            }
                        },
                        employees: []
                    }
                },
                {
                    timeStart: "2024-04-24T06:57:00Z",
                    timeEnd: "2024-04-24T08:15:40Z",
                    actionType: TimeListActionType.DOWNTIME,
                    order: null
                },
                {
                    timeStart: "2024-04-24T08:15:40Z",
                    timeEnd: "2024-04-24T08:40:00Z",
                    actionType: TimeListActionType.TRANSFER,
                    order: null
                },
                {
                    timeStart: "2024-04-24T08:40:00Z",
                    timeEnd: "2024-04-24T09:31:00Z",
                    actionType: TimeListActionType.ORDER,
                    order: {
                        id: 489_046,
                        startDescription: null,
                        finishDescription: null,
                        orderApplication: null,
                        duration: 3060,
                        passengerCount: 1,
                        maleEmployeeCount: 2,
                        femaleEmployeeCount: 0,
                        additionalInfo: null,
                        orderTime: "2024-04-24T11:40:00Z",
                        startTime: "2024-04-24T11:46:10Z",
                        finishTime: "2024-04-24T12:25:35Z",
                        absenceTime: null,
                        cancelTime: null,
                        orderStatus: {
                            code: OrderStatusCodeEnum.COMPLETED,
                            name: "Заявка закончена"
                        },
                        passenger: {
                            id: 47_445,
                            firstName: "Иван 47445",
                            lastName: "Иванов",
                            middleName: null,
                            sex: Sex.MALE,
                            comment: null,
                            hasPacemaker: false,
                            category: {
                                code: PassengerCategoryCodeEnum.RDK,
                                name: "Родители с детскими колясками",
                                shortName: "РДК"
                            },
                            phones: []
                        },
                        baggage: null,
                        transfers: [],
                        passengerCategory: {
                            code: PassengerCategoryCodeEnum.RDK,
                            name: "Родители с детскими колясками",
                            shortName: "РДК"
                        },
                        startStation: {
                            id: 39,
                            name: "Кантемировская",
                            line: {
                                id: 2,
                                name: "2",
                                color: "#2DBE2C"
                            }
                        },
                        finishStation: {
                            id: 6,
                            name: "Комсомольская СЛ",
                            line: {
                                id: 1,
                                name: "1",
                                color: "#EF161E"
                            }
                        },
                        employees: []
                    }
                },
                {
                    timeStart: "2024-04-24T09:31:00Z",
                    timeEnd: "2024-04-24T09:35:00Z",
                    actionType: TimeListActionType.DOWNTIME,
                    order: null
                },
                {
                    timeStart: "2024-04-24T09:35:00Z",
                    timeEnd: "2024-04-24T10:00:00Z",
                    actionType: TimeListActionType.TRANSFER,
                    order: null
                },
                {
                    timeStart: "2024-04-24T10:00:00Z",
                    timeEnd: "2024-04-24T10:44:20Z",
                    actionType: TimeListActionType.ORDER,
                    order: {
                        id: 488_361,
                        startDescription: null,
                        finishDescription: null,
                        orderApplication: null,
                        duration: 2660,
                        passengerCount: 1,
                        maleEmployeeCount: 4,
                        femaleEmployeeCount: 0,
                        additionalInfo: null,
                        orderTime: "2024-04-24T13:00:00Z",
                        startTime: "2024-04-24T13:00:37Z",
                        finishTime: "2024-04-24T13:31:17Z",
                        absenceTime: null,
                        cancelTime: null,
                        orderStatus: {
                            code: OrderStatusCodeEnum.COMPLETED,
                            name: "Заявка закончена"
                        },
                        passenger: {
                            id: 45_665,
                            firstName: "Иван 45665",
                            lastName: "Иванов",
                            middleName: null,
                            sex: Sex.MALE,
                            comment: null,
                            hasPacemaker: false,
                            category: {
                                code: PassengerCategoryCodeEnum.DI,
                                name: "Ребенок инвалид",
                                shortName: "ДИ"
                            },
                            phones: []
                        },
                        baggage: null,
                        transfers: [],
                        passengerCategory: {
                            code: PassengerCategoryCodeEnum.DI,
                            name: "Ребенок инвалид",
                            shortName: "ДИ"
                        },
                        startStation: {
                            id: 109,
                            name: "Новые Черёмушки",
                            line: {
                                id: 6,
                                name: "6",
                                color: "#ED9121"
                            }
                        },
                        finishStation: {
                            id: 170,
                            name: "Пражская",
                            line: {
                                id: 9,
                                name: "9",
                                color: "#999999"
                            }
                        },
                        employees: []
                    }
                },
                {
                    timeStart: "2024-04-24T10:44:20Z",
                    timeEnd: "2024-04-24T11:37:10Z",
                    actionType: TimeListActionType.DOWNTIME,
                    order: null
                },
                {
                    timeStart: "2024-04-24T11:37:10Z",
                    timeEnd: "2024-04-24T12:00:00Z",
                    actionType: TimeListActionType.TRANSFER,
                    order: null
                },
                {
                    timeStart: "2024-04-24T12:00:00Z",
                    timeEnd: "2024-04-24T12:43:00Z",
                    actionType: TimeListActionType.ORDER,
                    order: {
                        id: 489_156,
                        startDescription: null,
                        finishDescription: null,
                        orderApplication: null,
                        duration: 2580,
                        passengerCount: 1,
                        maleEmployeeCount: 4,
                        femaleEmployeeCount: 0,
                        additionalInfo: null,
                        orderTime: "2024-04-24T15:00:00Z",
                        startTime: "2024-04-24T14:58:12Z",
                        finishTime: "2024-04-24T15:22:31Z",
                        absenceTime: null,
                        cancelTime: null,
                        orderStatus: {
                            code: OrderStatusCodeEnum.COMPLETED,
                            name: "Заявка закончена"
                        },
                        passenger: {
                            id: 32_156,
                            firstName: "Иван 32156",
                            lastName: "Иванов",
                            middleName: null,
                            sex: Sex.MALE,
                            comment: null,
                            hasPacemaker: false,
                            category: {
                                code: PassengerCategoryCodeEnum.IK,
                                name: "Инвалид колясочник",
                                shortName: "ИК"
                            },
                            phones: []
                        },
                        baggage: null,
                        transfers: [],
                        passengerCategory: {
                            code: PassengerCategoryCodeEnum.IK,
                            name: "Инвалид колясочник",
                            shortName: "ИК"
                        },
                        startStation: {
                            id: 107,
                            name: "Академическая",
                            line: {
                                id: 6,
                                name: "6",
                                color: "#ED9121"
                            }
                        },
                        finishStation: {
                            id: 8,
                            name: "Чистые пруды",
                            line: {
                                id: 1,
                                name: "1",
                                color: "#EF161E"
                            }
                        },
                        employees: []
                    }
                },
                {
                    timeStart: "2024-04-24T12:43:00Z",
                    timeEnd: "2024-04-24T13:00:00Z",
                    actionType: TimeListActionType.DOWNTIME,
                    order: null
                },
                {
                    timeStart: "2024-04-24T13:00:00Z",
                    timeEnd: "2024-04-24T22:00:00Z",
                    actionType: TimeListActionType.NON_WORKING,
                    order: null
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
