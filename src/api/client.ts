import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const getClient = (baseURL?: string): AxiosInstance => {
    const options = {
        baseURL: baseURL ? baseURL : undefined,
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
        },
    };

    let client = axios.create(options);

    const handleResponse = (response: AxiosResponse) => {
        return Promise.resolve(response.data);
    };

    const handleError = (error: AxiosError) => {
        return Promise.reject(error.response);
    }

    client.interceptors.response.use(
        handleResponse,
        handleError)

    return client;
}

export { getClient }