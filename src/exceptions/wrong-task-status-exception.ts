import { HttpException } from "@nestjs/common";

export class WrongTaskStatusException extends HttpException{
    constructor() {
        super("Wrong task status transition!...", 400);
      }
}