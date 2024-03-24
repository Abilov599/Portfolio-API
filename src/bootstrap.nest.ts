import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestExpressApplication } from '@nestjs/platform-express';

export const bootstrap = async (): Promise<NestExpressApplication> => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  return app;
};

export const bootstrapServerless = async () => {
  const app = await bootstrap();
  const globalPrefix = '.netlify/functions/main';
  app.setGlobalPrefix(globalPrefix);

  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
};
