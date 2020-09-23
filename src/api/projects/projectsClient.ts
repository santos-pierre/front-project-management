import { ApiClient } from '../ApiClient';

let client = new ApiClient(process.env.REACT_APP_API);

export default {
    index() {
        return client.get('/api/projects');
    },

    show(project: string) {
        return client.get(`/api/projects/${project}`);
    },

    store(data: object) {
        return client.post('/api/projects', data);
    },

    update(project: string, data: object) {
        return client.patch(`/api/projects/${project}`, data);
    },

    delete(project: string) {
        return client.delete(`/api/projects/${project}`);
    },
}