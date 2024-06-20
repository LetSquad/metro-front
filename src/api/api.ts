import axiosObj from "axios";
import { makeUseAxios } from "axios-hooks";

const normalAxios = axiosObj.create();
export const mockAxios = axiosObj.create();

const axios = process.env.WITH_MOCK ? mockAxios : normalAxios;
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export const useAxios = makeUseAxios({ axios });

export default axios;
