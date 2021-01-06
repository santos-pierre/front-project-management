import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const getClient = (baseURL?: string): AxiosInstance => {
    const options = {
        baseURL: baseURL ? baseURL : undefined,
        withCredentials: true,
        headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
    };

    let client = axios.create(options);

    const handleResponse = (response: AxiosResponse) => {
        return Promise.resolve(response);
    };

    const handleError = (error: AxiosError) => {
        return Promise.reject(error.response);
    };

    client.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${localStorage.getItem(
            'sanctum_token'
        )}`;
        return config;
    });

    client.interceptors.response.use(handleResponse, handleError);

    return client;
};

export { getClient };
