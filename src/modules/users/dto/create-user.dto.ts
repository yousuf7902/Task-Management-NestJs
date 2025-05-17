import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Role } from "../role.enum";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsArray()
    roles: Role[];
}