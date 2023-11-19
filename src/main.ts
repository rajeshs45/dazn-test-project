import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import * as dotenv from 'dotenv';
import { ConfigService } from './shared/services/config.service';
import { config } from './config';
dotenv.config();
async function bootstrap() {
  ConfigService.setEnvironment(config.ENVIRONMENT);
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ extended: true, limit: '100mb' }));
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
  });
  await app.listen(process.env.PORT, () => {
    console.log(`server listening on: ${process.env.PORT}`);
  });
}
bootstrap();
