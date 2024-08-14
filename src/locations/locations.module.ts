import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/database/entities/company.entities';
import { Location } from 'src/database/entities/locations.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, Location]), 
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
  exports: [LocationsService], 
})
export class LocationsModule {}
