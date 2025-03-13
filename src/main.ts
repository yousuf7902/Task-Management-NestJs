import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { LoggerService } from "./utils/logger.util";
import { ValidationPipe } from "@nestjs/common";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new LoggerService();

  app.useGlobalPipes(new ValidationPipe({
    transform:true,
    whitelist:true
  }));
  app.useGlobalFilters(new AllExceptionsFilter(logger));
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
