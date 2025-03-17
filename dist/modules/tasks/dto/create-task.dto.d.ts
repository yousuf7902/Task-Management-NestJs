import { TaskStatus } from "../model/task.model";
export declare class CreateTaskDto {
    title: string;
    userId: number;
    description: string;
    status: TaskStatus;
}
