import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { TrimPipe } from './modules/common/pipes/trim.pipe';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const port = process.env.APP_PORT || '3000';
  const options = new DocumentBuilder()
      .setTitle('Students documentation.')
      .setDescription('The students API description.')
      .setVersion('1.0')
      .addTag('students')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(
        new TrimPipe(),
        new ValidationPipe(),
    );
  await app.listen(port);
}
bootstrap();
