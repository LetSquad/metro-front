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

mock.onGet(apiUrls.employeesProfile()).reply<EmployeeCurrentResponse>(200, {
    id: 0,
    login: "+7 (999) 999-99-91",
    employeeRole: EmployeeRole.EXECUTOR,
    workPhone: "+7 (999) 999-99-91",
    personalPhone: "+7 (999) 999-99-19",
    firstName: "Иванов",
    lastName: "Иван",
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
                            name: "Замоскворецкая",
                            color: "#2DBE2C"
                        },
                        name: "Аэропорт"
                    },
                    finishStation: {
                        id: 3,
                        line: {
                            id: 2,
                            name: "Замоскворецкая",
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
                            name: "Замоскворецкая",
                            color: "#2DBE2C"
                        },
                        name: "Белорусская"
                    },
                    finishStation: {
                        id: 4,
                        line: {
                            id: 4,
                            name: "Кольцевая",
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
                            id: 3,
                            name: "Кольцевая",
                            color: "#8D5B2D"
                        },
                        name: "Белорусская"
                    },
                    finishStation: {
                        id: 5,
                        line: {
                            id: 3,
                            name: "Кольцевая",
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
                            id: 3,
                            name: "Кольцевая",
                            color: "#8D5B2D"
                        },
                        name: "Добрынинская"
                    },
                    finishStation: {
                        id: 6,
                        line: {
                            id: 8,
                            name: "Серпуховско-Тимирязевская",
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
                            name: "Серпуховско-Тимирязевская",
                            color: "#999999"
                        },
                        name: "Серпуховская"
                    },
                    finishStation: {
                        id: 7,
                        line: {
                            id: 8,
                            name: "Серпуховско-Тимирязевская",
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
                    id: 2,
                    name: "Замоскворецкая",
                    color: "#2DBE2C"
                },
                name: "Аэропорт"
            },
            finishStation: {
                id: 7,
                line: {
                    id: 8,
                    name: "Серпуховско-Тимирязевская",
                    color: "#999999"
                },
                name: "Нагорная"
            }
        }
    ]
});
