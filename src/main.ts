import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LocationSeedService } from './database/seeds/init';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const locationSeedService = app.get(LocationSeedService);
  await locationSeedService.seed();

  await app.listen(3000);
}
bootstrap();
