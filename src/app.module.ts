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
      entities: [Company, Location],
      migrations: ['./database/migrations/*.ts'],
      synchronize: true, 
    }),
    CompaniesModule,
    LocationsModule,
    SeedsModule, 
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
