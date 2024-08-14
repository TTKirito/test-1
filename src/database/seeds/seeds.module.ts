
import { Module } from '@nestjs/common';
import { LocationSeedService } from './init';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../entities/company.entities';
import { Location } from '../entities/locations.entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([Company, Location]),
    ],
    providers: [LocationSeedService],
    exports: [LocationSeedService],
})
export class SeedsModule { }