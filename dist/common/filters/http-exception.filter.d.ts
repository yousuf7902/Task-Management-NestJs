import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { LoggerService } from 'src/utils/logger.util';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: LoggerService);
    catch(exception: HttpException, host: ArgumentsHost): void;
}
