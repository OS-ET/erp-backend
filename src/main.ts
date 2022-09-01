import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as csurf from 'csurf';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet())
  //TODO: enable csurf after initializing session or cookie parser
  // app.use(csurf()) 
  const config = new DocumentBuilder()
  .setTitle("Open Source ERP project")
  .setDescription("Ethiopian Open source projects")
  .setVersion('1.0')
  .addTag('OCS-backend')
  .build();
  const document=SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api',app,document)

  await app.listen(3000);
}
bootstrap();
