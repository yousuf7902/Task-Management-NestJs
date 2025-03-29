import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateTaskLabelDto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    labelName: string;
}