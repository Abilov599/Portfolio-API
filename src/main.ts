import { ImATeapotException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as cookieParser from 'cookie-parser';

import { AppModule } from './modules/app.module';

const whitelist = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://10.0.2.2:3000',
];

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      origin: function (origin, callback) {
        if (!origin) {
          callback(null, true);
          return;
        }
        if (
          whitelist.includes(origin) ||
          !!origin.match(/jeyhunabilov\.live$/)
        ) {
          callback(null, true);
        } else {
          callback(new ImATeapotException('Not allowed by CORS'), false);
        }
      },
    },
  });
  app.setGlobalPrefix('api/v1');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(8000);
}
bootstrap().catch((error) => {
  console.error('Unhandled error during bootstrap:', error);
});
