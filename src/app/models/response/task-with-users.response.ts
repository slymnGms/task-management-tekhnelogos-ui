import { User } from "./user.response";

export interface TaskWithUsers {
    taskId: number;
    title: string;
    users: User[];
}
