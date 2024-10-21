export interface UserTask {
    id: number;
    taskId: number;
    taskTitle: string;
    taskDescription: string;
    taskDueDate: Date;
    userId: number;
    userUsername: string;
    userEmail: string;
}