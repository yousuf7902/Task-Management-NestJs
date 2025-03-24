import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { LoggerService } from "./utils/logger.util";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new LoggerService();

  app.setGlobalPrefix(process.env.API_GLOBAL_PREFIX as string)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );

  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Task API")
    .setDescription("The task API description")
    .setVersion("1.0")
    .addTag("ALL API")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("task-api", app, document);

  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
