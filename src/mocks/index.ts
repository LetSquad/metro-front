import MockAdapter from "axios-mock-adapter";

import { mockAxios } from "@api/api";
import apiUrls from "@api/apiUrls";
import { SignInFieldName } from "@models/auth/enums";
import { SignInResponse } from "@models/auth/types";
import { Sex } from "@models/common/enums";
import { EmployeeRankCodeEnum, EmployeeRole } from "@models/employee/enums";
import { EmployeeCurrentResponse, EmployeesResponse, EmployeeWithLockResponse, NewEmployeeResponse } from "@models/employee/types";
import { OrderStatusCodeEnum } from "@models/order/enums";
import {
    Order,
    OrderCalculationResponse,
    OrderResponse,
    OrdersResponse,
    OrdersTimeList,
    OrdersTimeListResponse,
    OrderWithLockResponse
} from "@models/order/types";
import { PassengerCategoryCodeEnum } from "@models/passenger/enums";
import { PassengersResponse, PassengerWithLockResponse } from "@models/passenger/types";

import calculation from "./calculation.json";
import distribution from "./distribution.json";
import order from "./order.json";
import orderNewStatus from "./orderNewStatus.json";
import orders from "./orders.json";
import ordersTimeList from "./ordersTimeList.json";

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
    login: "79999999991",
    employeeRole: EmployeeRole.EXECUTOR,
    workPhone: "79999999991",
    personalPhone: "79999999919",
    firstName: "Иван",
    lastName: "Иванов",
    middleName: "Иванович",
    sex: Sex.MALE,
    shift: "08:00-20:00",
    employeeNumber: 123_456,
    lightDuties: false,
    rank: {
        code: EmployeeRankCodeEnum.INSPECTOR,
        name: "Инспектор",
        shortName: "ЦИ"
    }
}); */

/* mock.onGet(apiUrls.employeesProfile()).reply<EmployeeCurrentResponse>(200, {
    id: 1,
    login: "79999999992",
    employeeRole: EmployeeRole.OPERATOR,
    workPhone: "79999999992",
    personalPhone: "79999999929",
    firstName: "Петр",
    lastName: "Петров",
    middleName: "Петрович",
    sex: Sex.MALE,
    shift: "20:00-08:00",
    employeeNumber: 654_321,
    lightDuties: false,
    rank: {
        code: EmployeeRankCodeEnum.OPERATOR,
        name: "Оператор"
    }
}); */

mock.onGet(apiUrls.employeesProfile()).reply<EmployeeCurrentResponse>(200, {
    id: 4,
    login: "79999999994",
    employeeRole: EmployeeRole.ADMIN,
    workPhone: "79999999994",
    personalPhone: "79999999949",
    firstName: "Илья",
    lastName: "Смирнов",
    middleName: "Изосимович",
    sex: Sex.MALE,
    shift: "20:00-08:00",
    employeeNumber: 654_874,
    lightDuties: false,
    rank: {
        code: EmployeeRankCodeEnum.ADMINISTRATOR,
        name: "Администратор"
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
    list: ordersTimeList as unknown as OrdersTimeList[]
});

mock.onPost(apiUrls.ordersDistribution()).reply<OrdersTimeListResponse>(200, {
    total: 1,
    list: distribution as unknown as OrdersTimeList[]
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
            hasPacemaker: false,
            category: {
                code: PassengerCategoryCodeEnum.DI,
                name: "Ребенок инвалид",
                shortName: "ДИ"
            },
            comment: "Ребенок с диагнозом ДЦП. Испытывает трудности в передвижении",
            phones: [
                {
                    phone: "79917889899",
                    description: "Телефон матери"
                }
            ]
        }
    ]
});

mock.onGet(apiUrls.passengersId(0)).reply<PassengerWithLockResponse>(200, {
    isLockedForEdit: true,
    data: {
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
    }
});

mock.onGet(apiUrls.employees()).reply<EmployeesResponse>(200, {
    total: 2,
    list: [
        {
            id: 0,
            employeeRole: EmployeeRole.EXECUTOR,
            workPhone: "79999999991",
            personalPhone: "79999999919",
            firstName: "Иван",
            lastName: "Иванов",
            middleName: "Иванович",
            sex: Sex.MALE,
            shift: "08:00-20:00",
            employeeNumber: 123_456,
            lightDuties: false,
            rank: {
                code: EmployeeRankCodeEnum.INSPECTOR,
                name: "Инспектор",
                shortName: "ЦИ"
            }
        },
        {
            id: 1,
            employeeRole: EmployeeRole.EXECUTOR,
            workPhone: "79999999994",
            personalPhone: "79999999949",
            firstName: "Петр",
            lastName: "Петров",
            middleName: "Петрович",
            sex: Sex.MALE,
            shift: "07:00-19:00",
            employeeNumber: 134_780,
            lightDuties: true,
            rank: {
                code: EmployeeRankCodeEnum.INSPECTOR,
                name: "Инспектор",
                shortName: "ЦИ"
            }
        }
    ]
});

mock.onGet(apiUrls.employeesId(0)).reply<EmployeeWithLockResponse>(200, {
    isLockedForEdit: true,
    data: {
        id: 0,
        employeeRole: EmployeeRole.EXECUTOR,
        workPhone: "79999999991",
        personalPhone: "79999999919",
        firstName: "Иван",
        lastName: "Иванов",
        middleName: "Иванович",
        sex: Sex.MALE,
        shift: "08:00-20:00",
        employeeNumber: 123_456,
        lightDuties: false,
        rank: {
            code: EmployeeRankCodeEnum.INSPECTOR,
            name: "Инспектор",
            shortName: "ЦИ"
        }
    }
});

mock.onPost(apiUrls.employees()).reply<NewEmployeeResponse>(200, {
    id: 3,
    employeeRole: EmployeeRole.EXECUTOR,
    workPhone: "79999999995",
    personalPhone: "79999999959",
    firstName: "Семен",
    lastName: "Остроухов",
    middleName: "Никитич",
    sex: Sex.MALE,
    shift: "08:00-20:00",
    employeeNumber: 123_987,
    lightDuties: false,
    rank: {
        code: EmployeeRankCodeEnum.INSPECTOR,
        name: "Инспектор",
        shortName: "ЦИ"
    },
    login: "79999999995",
    password: "ve6G2!*jH4$0"
});

mock.onPost(apiUrls.ordersCalculation()).reply<OrderCalculationResponse>(200, calculation);

mock.onPut(apiUrls.ordersIdStatus(0), { status: OrderStatusCodeEnum.RIDE }).reply<OrderResponse>(
    200,
    orderNewStatus as unknown as OrderResponse
);
