import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/database/entities/company.entities';
import { Location } from 'src/database/entities/locations.entities';
import { LocationsModule } from 'src/locations/locations.module';
import { Device } from 'src/database/entities/device.entities';
import { CompanyDevice } from 'src/database/entities/companyDevice.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company, Location, Device, CompanyDevice]),
    LocationsModule
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule { }
