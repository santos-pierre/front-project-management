import { ApiClient } from '../ApiClient';

let client = new ApiClient(process.env.REACT_APP_API);

export default {
    currentUser(config: object = {}) {
        return client.get('/user', config);
    },

    login(data: object) {
        return client.post('/login', data);
    },

    registerUser(data: object) {
        return client.post('/register', data);
    },

    logout() {
        return client.post('/logout');
    },

    emailAlreadyTaken(data: object) {
        return client.post('/user/exist/email', data);
    },

    updateProfile(data: object) {
        return client.post('/user/profile', data);
    },

    updatePassword(data: object) {
        return client.post('/user/profile/password', data);
    },
};
