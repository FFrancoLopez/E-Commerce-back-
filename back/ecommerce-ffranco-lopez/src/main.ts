import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({

      // Elimina propiedades no definidas en el DTO.
      whitelist: true, 
      // Lanza un error si hay propiedades no definidas
      forbidNonWhitelisted: true, 
      // Transforma automáticamente los valores a los tipos definidos en el DTO
      transform: true, 

    }),
  );

  const swaggerConfig = new DocumentBuilder().setTitle('API de ecommerce').setDescription('Esta es una API de ecommerce').setVersion('1.0').addBearerAuth().build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document, {customSiteTitle: 'API de ecommerce'});
  
  app.use(loggerGlobal);

  await app.listen(process.env.PORT ?? 3000);

}

bootstrap();
