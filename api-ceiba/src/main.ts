import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './pagos/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  /*Swagger*/
  initSwagger(app);
  /*--validation--*/
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(8084);
  logger.log(`connected in ${await app.getUrl()}`);
}
bootstrap();
