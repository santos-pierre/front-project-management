import { ProjectType } from "./ProjectType";
import { UserType } from "./UserType";

export interface TaskType {
    slug: string,
    body: string,
    owner: UserType,
    project: ProjectType,
    done: boolean,
    id: number,
    option: boolean | false // Use For Option Edit/Delete On Each Task
};