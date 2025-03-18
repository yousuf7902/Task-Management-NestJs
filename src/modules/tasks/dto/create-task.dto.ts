import { IsEnum, IsInt, IsNotEmpty, IsString } from "class-validator";
import { TaskStatus } from "../model/task.model";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsString()
    description:string;

    @IsNotEmpty()
    @IsEnum(TaskStatus)
    status: TaskStatus;
}