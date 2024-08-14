
import { Module } from '@nestjs/common';
import { LocationSeedService } from './init';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../entities/company.entities';
import { Location } from '../entities/locations.entities';
import { Device } from '../entities/device.entities';
import { CompanyDevice } from '../entities/companyDevice.entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([Company, Location, Device, CompanyDevice]),
    ],
    providers: [LocationSeedService],
    exports: [LocationSeedService],
})
export class SeedsModule { }