export interface ITask {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
}
export declare enum TaskStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}
