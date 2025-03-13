import { Request, Response } from "express";
import { TasksService } from "../services/tasks.service";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task-dto";
export declare class TasksController {
    private readonly taskService;
    constructor(taskService: TasksService);
    getAllTasks(req: Request, res: Response): Promise<void>;
    createTasks(createTaskDto: CreateTaskDto, req: Request, res: Response): void;
    filterTask(status: string, req: Request, res: Response): Promise<void>;
    getTaskById(id: number, req: Request, res: Response): Promise<void>;
    updateTask(id: number, updateTaskDto: UpdateTaskDto, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteTask(id: number, req: Request, res: Response): Promise<void>;
}
