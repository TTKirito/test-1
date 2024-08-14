import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from './companies/companies.module';
import { dbConfig } from './configs/database.config';
import { ScheduleModule } from '@nestjs/schedule';
import * as dotenv from 'dotenv';
import { Company } from './database/entities/company.entities';
import { Location } from './database/entities/locations.entities';
import { SeedsModule } from './database/seeds/seeds.module';
import { LocationsModule } from './locations/locations.module';
import { Device } from './database/entities/device.entities';
import { CompanyDevice } from './database/entities/companyDevice.entities';
import { DevicesModule } from './devices/devices.module';
dotenv.config();

const { port, host, username, password, dbname } = dbConfig();

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host,
      port: Number(port),
      username,
      password,
      database: dbname,
      entities: [Company, Device, Location , CompanyDevice],
      migrations: ['./database/migrations/*.ts'],
      synchronize: false, 
    }),
    CompaniesModule,
    LocationsModule,
    SeedsModule, 
    DevicesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
