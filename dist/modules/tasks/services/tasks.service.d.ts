import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task-dto";
import { Task } from "../entities/task.entity";
import { Repository } from "typeorm";
export declare class TasksService {
    private taskRepository;
    private tasks;
    constructor(taskRepository: Repository<Task>);
    findAllTasks(status: string): Promise<Task[]>;
    findById(id: number): Promise<Task>;
    create(createTaskDto: CreateTaskDto): Promise<Task>;
    update(id: number, updateTaskDto: UpdateTaskDto): Promise<void>;
    private isValidStatus;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
