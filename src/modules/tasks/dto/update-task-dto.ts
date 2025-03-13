import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../model/task.model";

export class UpdateTaskDto{
        @IsOptional()
        @IsString()
        title: string;
    
        @IsOptional()
        @IsString()
        description:string;
    
        @IsOptional()
        @IsEnum(TaskStatus)
        status: TaskStatus
}