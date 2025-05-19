import { Transform } from "class-transformer";
import { IsEnum, IsIn, IsOptional, IsString, MinLength } from "class-validator";
import { TaskStatus } from "src/modules/tasks/model/task.model";

export class FindTaskParams {
    @IsOptional()
    @IsEnum(TaskStatus)
    status? : string;


    @IsOptional()
    @MinLength(3)
    @IsString()
    search? : string;

    @IsOptional()
    @Transform(({value} : {value? : string}) => {
        if(!value) return undefined;

        return value.split(",").map((label) => label.trim()).filter((label) => label.length) 
    }) 
    labels?: string[];

    @IsOptional()
    @IsEnum(['title', 'status'])
    sortBy?: string = "title";

    @IsOptional()
    @IsEnum(["ASC", "DESC"])
    sortOrder?: "ASC" | "DESC" = "DESC"

}