import { HttpException } from "@nestjs/common";

export class WrongTaskStatusException extends Error{
    constructor(){
    super("Wrong task status transition!...");
    this.name = "WrongTaskStatusException";
    }
}