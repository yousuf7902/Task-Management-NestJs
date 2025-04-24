import { IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { TaskStatus } from "src/modules/tasks/model/task.model";

export class FindTaskParams {
    @IsOptional()
    @IsEnum(TaskStatus)
    status? : string;


    @IsOptional()
    @MinLength(3)
    @IsString()
    search? : string;

}