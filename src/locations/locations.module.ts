import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/database/entities/company.entities';
import { Location } from 'src/database/entities/locations.entities';
import { Device } from 'src/database/entities/device.entities';
import { CompanyDevice } from 'src/database/entities/companyDevice.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, Location, Device, CompanyDevice]), 
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
  exports: [LocationsService], 
})
export class LocationsModule {}
