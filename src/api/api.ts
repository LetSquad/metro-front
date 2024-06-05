import axiosObj from "axios";

const normalAxios = axiosObj.create();
export const mockAxios = axiosObj.create();

const axios = process.env.WITH_MOCK ? mockAxios : normalAxios;

export default axios;
