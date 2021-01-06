import { ApiClient } from '../ApiClient';

let client = new ApiClient(process.env.REACT_APP_API);

export default {
    cookies(cookie_name: string) {
        return client.get(`/cookies/${cookie_name}`);
    },
};
