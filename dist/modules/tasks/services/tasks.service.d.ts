import { ITask, TaskStatus } from "../model/task.model";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task-dto";
export declare class TasksService {
    private tasks;
    findAllTasks(): Promise<ITask[]>;
    findById(id: number): Promise<ITask>;
    filterTask(status: string): Promise<ITask[]>;
    create(createTaskDto: CreateTaskDto): ITask;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<{
        title: string;
        description: string;
        status: TaskStatus;
        id: number;
    }>;
    private isValidStatus;
    delete(id: number): ITask[];
}
