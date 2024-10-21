import { Task } from "./task.response";

export interface GroupedTasks {
    groupName: string;
    tasks: Task[];
}