import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

import { Request, Response } from "express";
import { LoggerService } from "src/utils/logger.util";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();


    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = "" ;
    
    if(exception instanceof HttpException){
      const response = exception.getResponse() as any;
      message = response.message;
    }
    else{
      message = "Internal server error";
    }

    const errorResponse = {
      statusCode: status,
      path: request.url,
      errorMessage: message,
    };

    this.logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      "ExceptionFilter"
    );

    response.status(status).json(errorResponse);
  }
}
