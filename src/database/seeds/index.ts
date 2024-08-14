import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { LocationSeedService } from './init';

async function seed() {
  const app = await NestFactory.create(AppModule);
  const locationSeedService = app.get(LocationSeedService);

  await locationSeedService.seed();
  await app.close();
}

seed().catch(err => {
  console.error('Error running seed:', err);
  process.exit(1);
});