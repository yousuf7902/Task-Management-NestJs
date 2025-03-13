import { ITask } from "../model/task.model";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task-dto";
export declare class TasksService {
    private tasks;
    findAllTasks(): Promise<ITask[]>;
    create(createTaskDto: CreateTaskDto): ITask;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<void>;
}
