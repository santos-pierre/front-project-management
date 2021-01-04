import { ApiClient } from '../ApiClient';

let client = new ApiClient(process.env.REACT_APP_API);

export default {
    index() {
        return client.get('/projects');
    },

    show(project: string) {
        return client.get(`/projects/${project}`);
    },

    store(data: object) {
        return client.post('/projects', data);
    },

    update(project: string, data: object) {
        return client.patch(`/projects/${project}`, data);
    },

    delete(project: string) {
        return client.delete(`/projects/${project}`);
    },
};
