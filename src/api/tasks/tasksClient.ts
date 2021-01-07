import { ApiClient } from '../ApiClient';

let client = new ApiClient(process.env.REACT_APP_API);

export default {
    tasks(project: string) {
        return client.get(`/projects/${project}/tasks`);
    },

    createTask(project: string, data: object) {
        return client.post(`/projects/${project}/tasks`, data);
    },

    updateTask(project: string, taskId: number, data: object) {
        return client.patch(`/projects/${project}/tasks/${taskId}`, data);
    },

    delete(project: string, taskId: number) {
        return client.delete(`/projects/${project}/tasks/${taskId}`);
    },
};
