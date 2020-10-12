import { ApiClient } from '../ApiClient';

let client = new ApiClient(process.env.REACT_APP_API);

export default {
    currentUser() {
        return client.get('api/user');
    },

    async login(data: object) {
        await client.get('/sanctum/csrf-cookie');
        return client.post('login', data);
    },

    registerUser(data: object) {
        return client.post('register', data);
    },

    logout() {
        return client.post('logout');
    },

    emailAlreadyTaken(data: object) {
        return client.post('/user/exist/email', data);
    },

    updateProfile(data: object) {
        return client.post('api/user/profile', data);
    },

    updatePhotoProfile(data: object) {
        return client.post('api/user/profile/photo', data);
    }
}