import { ProjectType } from './ProjectType';
import { UserType } from './UserType';

export interface TaskType {
    slug: string;
    body: string;
    owner: UserType;
    project: ProjectType;
    done: boolean;
    id: number;
}
