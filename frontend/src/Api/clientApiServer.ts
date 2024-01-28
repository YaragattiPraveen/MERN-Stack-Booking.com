import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { root } from './Endpoints/endPoints';

interface RequestHeaders {
    [key: string]: string;
}


const requestInterceptor = (instance: AxiosInstance, headers: RequestHeaders): void => {
    instance.interceptors.request.use(
        //@ts-ignore
        function (config: AxiosRequestConfig<RequestHeaders>) {
            config.headers = {
                ...(config.headers as Record<string, string>),
                ...headers,
            };
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );
};


const responseInterceptor = (instance: AxiosInstance): void => {
    instance.interceptors.response.use(
        (res: AxiosResponse) => {
            return res.data;
        },
        (error) => {
            throw error;
        }
    );
};

interface ApiRequestParams extends AxiosRequestConfig {
    headers?: RequestHeaders;
    successMsg?: string
}

const sendApiRequest = ({ headers = {}, ...others }: ApiRequestParams) => {
    const instance = axios.create({
        baseURL: root.baseUrl,
        withCredentials: true
    });

    requestInterceptor(instance, headers);
    responseInterceptor(instance);

    return instance({ ...others, headers: headers as Record<string, string> });
};

export default sendApiRequest;
