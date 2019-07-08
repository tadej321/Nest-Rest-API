import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

/**
 * Creates a documentation of the application.
 * The documentation is visible on localhost:3000/api
 **/
  const options = new DocumentBuilder()
        .setTitle('nestJS rest API')
        .setDescription('An API built in the nestJS framework that allows the user to obtain existing information of stored products, to post information of a new product,\n' +
            '  to edit stored product information and to delete stored products')
        .setVersion('1.0')
        .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
