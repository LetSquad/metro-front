import MockAdapter from "axios-mock-adapter";

import { mockAxios } from "@api/api";
import apiUrls from "@api/apiUrls";
import { SignInFieldName } from "@models/auth/enums";
import { SignInResponse } from "@models/auth/types";
import { Sex } from "@models/common/enums";
import { EmployeeRole } from "@models/employee/enums";
import { EmployeeCurrentResponse } from "@models/employee/types";
import { OrderApplicationCodeEnum, OrderStatusCodeEnum } from "@models/order/enums";
import { OrdersResponse } from "@models/order/types";
import { PassengerCategoryCodeEnum } from "@models/passenger/enums";

const mock = new MockAdapter(mockAxios, { delayResponse: 1000, onNoMatch: "passthrough" });

mock.onPost(apiUrls.signIn(), {
    [SignInFieldName.PHONE]: "+7 (999) 999-99-91",
    [SignInFieldName.PASSWORD]: "pass"
}).reply(200, {
    role: EmployeeRole.EXECUTOR
});
mock.onPost(apiUrls.signIn(), {
    [SignInFieldName.PHONE]: "+7 (999) 999-99-92",
    [SignInFieldName.PASSWORD]: "pass"
}).reply(200, {
    role: EmployeeRole.OPERATOR
});
mock.onPost(apiUrls.signIn(), {
    [SignInFieldName.PHONE]: "+7 (999) 999-99-93",
    [SignInFieldName.PASSWORD]: "pass"
}).reply<SignInResponse>(200, {
    role: EmployeeRole.SPECIALIST
});
mock.onPost(apiUrls.signIn(), {
    [SignInFieldName.PHONE]: "+7 (999) 999-99-94",
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
    orders: [
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
                            name: 2,
                            color: "#2DBE2C"
                        },
                        name: "Аэропорт"
                    },
                    finishStation: {
                        id: 3,
                        line: {
                            id: 2,
                            name: 2,
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
                            name: 2,
                            color: "#2DBE2C"
                        },
                        name: "Белорусская"
                    },
                    finishStation: {
                        id: 4,
                        line: {
                            id: 4,
                            name: 5,
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
                            name: 5,
                            color: "#8D5B2D"
                        },
                        name: "Белорусская"
                    },
                    finishStation: {
                        id: 5,
                        line: {
                            id: 5,
                            name: 5,
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
                            name: 5,
                            color: "#8D5B2D"
                        },
                        name: "Добрынинская"
                    },
                    finishStation: {
                        id: 6,
                        line: {
                            id: 8,
                            name: 9,
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
                            name: 9,
                            color: "#999999"
                        },
                        name: "Серпуховская"
                    },
                    finishStation: {
                        id: 7,
                        line: {
                            id: 8,
                            name: 9,
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
                    name: 2,
                    color: "#2DBE2C"
                },
                name: "Аэропорт"
            },
            finishStation: {
                id: 7,
                line: {
                    id: 8,
                    name: 9,
                    color: "#999999"
                },
                name: "Нагорная"
            }
        }
    ]
});

mock.onGet(apiUrls.orders()).reply<OrdersResponse>(200, {
    orders: [
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
                            name: 2,
                            color: "#2DBE2C"
                        },
                        name: "Аэропорт"
                    },
                    finishStation: {
                        id: 3,
                        line: {
                            id: 1,
                            name: 2,
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
                            name: 2,
                            color: "#2DBE2C"
                        },
                        name: "Белорусская"
                    },
                    finishStation: {
                        id: 4,
                        line: {
                            id: 4,
                            name: 5,
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
                            name: 5,
                            color: "#8D5B2D"
                        },
                        name: "Белорусская"
                    },
                    finishStation: {
                        id: 5,
                        line: {
                            id: 4,
                            name: 5,
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
                            name: 5,
                            color: "#8D5B2D"
                        },
                        name: "Добрынинская"
                    },
                    finishStation: {
                        id: 6,
                        line: {
                            id: 8,
                            name: 9,
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
                            name: 9,
                            color: "#999999"
                        },
                        name: "Серпуховская"
                    },
                    finishStation: {
                        id: 7,
                        line: {
                            id: 8,
                            name: 9,
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
                    name: 2,
                    color: "#2DBE2C"
                },
                name: "Аэропорт"
            },
            finishStation: {
                id: 7,
                line: {
                    id: 8,
                    name: 9,
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
                            name: 6,
                            color: "#ED9121"
                        },
                        name: "Бабушкинская"
                    },
                    finishStation: {
                        id: 14,
                        line: {
                            id: 5,
                            name: 6,
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
                            name: 6,
                            color: "#ED9121"
                        },
                        name: "Третьяковская"
                    },
                    finishStation: {
                        id: 15,
                        line: {
                            id: 1,
                            name: 2,
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
                            name: 2,
                            color: "#2DBE2C"
                        },
                        name: "Новокузнецкая"
                    },
                    finishStation: {
                        id: 16,
                        line: {
                            id: 1,
                            name: 2,
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
                    name: 6,
                    color: "#ED9121"
                },
                name: "Бабушкинская"
            },
            finishStation: {
                id: 16,
                line: {
                    id: 1,
                    name: 2,
                    color: "#2DBE2C"
                },
                name: "Тверская"
            }
        }
    ]
});
