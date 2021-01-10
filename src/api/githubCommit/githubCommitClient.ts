import { ApiClient } from '../ApiClient';

let client = new ApiClient(process.env.REACT_APP_API);

export default {
    commitsByBranches(owner: string, repository: string) {
        return client.get(`/github/commits/${owner}/${repository}`);
    },
};
