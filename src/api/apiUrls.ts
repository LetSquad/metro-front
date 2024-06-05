const externalUrl = process.env.EXTERNAL_URL || "https://localhost:8443";
const baseUrl = `${externalUrl}/api`;
const ordersUrl = `${baseUrl}/orders`;
const passengersUrl = `${baseUrl}/passengers`;
const employeesUrl = `${baseUrl}/employees`;
const authUrl = `${baseUrl}/auth`;
const metro = `${baseUrl}/metro`;

const apiUrls = {
    orders: () => ordersUrl,
    ordersId: (orderId: string) => `${ordersUrl}/${orderId}`,
    ordersCalculation: () => `${ordersUrl}/calculation`,
    ordersDistribution: () => `${ordersUrl}/distribution`,
    passengers: () => passengersUrl,
    passengersId: (passengerId: string) => `${passengersUrl}/${passengerId}`,
    passengersCategories: () => `${passengersUrl}/categories`,
    employees: () => employeesUrl,
    employeesProfile: () => `${employeesUrl}/profile`,
    employeesId: (employeeId: string) => `${employeesUrl}/${employeeId}`,
    employeesIdResetPassword: (employeeId: string) => `${employeesUrl}/${employeeId}/reset-password`,
    employeesRanks: () => `${employeesUrl}/ranks`,
    employeesShifts: () => `${employeesUrl}/shifts`,
    metroStations: () => metro,
    signIn: () => authUrl,
    refreshToken: () => `${authUrl}/refresh`
};

export default apiUrls;
