"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logger_util_1 = require("./utils/logger.util");
const common_1 = require("@nestjs/common");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new logger_util_1.LoggerService();
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter(logger));
    app.enableCors();
    await app.listen(process.env.PORT ?? 3000);
    logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map