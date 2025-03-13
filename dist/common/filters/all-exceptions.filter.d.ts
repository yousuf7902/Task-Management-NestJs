import { ExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { LoggerService } from "src/utils/logger.util";
export declare class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger;
    constructor(logger: LoggerService);
    catch(exception: unknown, host: ArgumentsHost): void;
}
