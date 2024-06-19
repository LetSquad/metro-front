import MockAdapter from "axios-mock-adapter";

import { mockAxios } from "@api/api";
import apiUrls from "@api/apiUrls";
import { SignInFieldName } from "@models/auth/enums";
import { SignInResponse } from "@models/auth/types";
import { Sex } from "@models/common/enums";
import { EmployeeRole } from "@models/employee/enums";
import { EmployeeCurrentResponse, EmployeesResponse } from "@models/employee/types";
import { OrderStatusCodeEnum, TimeListActionType } from "@models/order/enums";
import {
    Order,
    OrderCalculationResponse,
    OrderResponse,
    OrdersResponse,
    OrdersTimeListResponse,
    OrderWithLockResponse
} from "@models/order/types";
import { PassengerCategoryCodeEnum } from "@models/passenger/enums";
import { PassengersResponse } from "@models/passenger/types";

import calculation from "./calculation.json";
import order from "./order.json";
import orderNewStatus from "./orderNewStatus.json";
import orders from "./orders.json";

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
    list: orders as unknown as Order[]
});

mock.onGet(apiUrls.orders()).reply<OrdersResponse>(200, {
    total: 4,
    list: orders as unknown as Order[]
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

mock.onGet(apiUrls.ordersId(1)).reply<OrderWithLockResponse>(200, {
    isLockedForEdit: true,
    data: order as unknown as Order
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

mock.onPost(apiUrls.ordersCalculation()).reply<OrderCalculationResponse>(200, calculation);

mock.onPut(apiUrls.ordersIdStatus(0), { status: OrderStatusCodeEnum.RIDE }).reply<OrderResponse>(
    200,
    orderNewStatus as unknown as OrderResponse
);
