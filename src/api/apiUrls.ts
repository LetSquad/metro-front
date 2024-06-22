const externalUrl = process.env.EXTERNAL_URL || "https://localhost:8443";
const externalWebSocketUrl = process.env.EXTERNAL_URL
    ? process.env.EXTERNAL_URL.replace("https", "wss").replace("http", "ws")
    : "wss://localhost:8443";
const baseUrl = `${externalUrl}/api`;
const ordersUrl = `${baseUrl}/orders`;
const passengersUrl = `${baseUrl}/passengers`;
const employeesUrl = `${baseUrl}/employees`;
const authUrl = `${baseUrl}/auth`;
const metro = `${baseUrl}/metro`;
const websocket = `${externalWebSocketUrl}/websocket`;

const apiUrls = {
    orders: () => ordersUrl,
    ordersCurrent: () => `${ordersUrl}/current`,
    ordersId: (orderId: number) => `${ordersUrl}/${orderId}`,
    ordersIdStatus: (orderId: number) => `${ordersUrl}/${orderId}/status`,
    ordersCalculation: () => `${ordersUrl}/calculation`,
    ordersTimeList: () => `${ordersUrl}/time-list`,
    ordersDistribution: () => `${ordersUrl}/distribution`,
    passengers: () => passengersUrl,
    passengersId: (passengerId: number) => `${passengersUrl}/${passengerId}`,
    passengersCategories: () => `${passengersUrl}/categories`,
    employees: () => employeesUrl,
    employeesProfile: () => `${employeesUrl}/profile`,
    employeesId: (employeeId: number) => `${employeesUrl}/${employeeId}`,
    employeesResetPassword: () => `${employeesUrl}/reset-password`,
    employeesRanks: () => `${employeesUrl}/ranks`,
    employeesShifts: () => `${employeesUrl}/shifts`,
    metroStations: () => metro,
    signIn: () => authUrl,
    refreshToken: () => `${authUrl}/refresh`,
    websocket: () => websocket
};

export default apiUrls;
