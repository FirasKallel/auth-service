import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationErrorFilter } from './filters/validation-error.filter';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('common'));
  app.useGlobalPipes(
    new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
  );
  app.useGlobalFilters(new ValidationErrorFilter());

  const config = new DocumentBuilder()
    .setTitle(process.env.API_TITLE)
    .setDescription('')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.SWAGGER_URI, app, document);
  app.enableCors();
  await app.listen(process.env.API_PORT || 3000);
}
bootstrap();
