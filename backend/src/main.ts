import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // const globalPrefix = 'api';
  const port: number = 3000;
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix(globalPrefix);
  await app.listen(port);
  console.log(`App is running on: http://localhost:${port}`);
}
bootstrap();
