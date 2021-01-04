import { ApiClient } from '../ApiClient';

let client = new ApiClient(process.env.REACT_APP_API);

export default {
    commitsByBranches(data: object) {
        return client.get('/github/commits', data);
    },
};
