import { ApiClient } from '../ApiClient';

let client = new ApiClient(process.env.REACT_APP_API);

export default {
    index() {
        return client.get('/api/projects');
    },

    show(projectID: number) {
        return client.post(`/api/projects/${projectID}`);
    },

    store(data: object) {
        return client.post('/api/projects', data);
    },

    update(projectID: number, data: object) {
        return client.patch(`/api/projects/${projectID}`, data);
    },

    delete(projectID: number) {
        return client.delete(`/api/projects/${projectID}`);
    },
}