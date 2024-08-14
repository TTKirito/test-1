import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Connection, Repository } from 'typeorm';
import { Company } from '../database/entities/company.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { LocationsService } from 'src/locations/locations.service';
import { CompanyStatus } from './utils/company-status.enum';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,

    private readonly locationService: LocationsService,
    private connection: Connection,
  ) {
  }

  private isDateInPast(timestamp: number): boolean {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    return date < now;
  }

  async filterObjectsByExistingLocations(
    objects: any[],
  ): Promise<any[]> {
    const locationIds = [...new Set(objects.map(obj => obj.location_id))];

    const missingLocationIds = await this.locationService.findMissingLocationIds(locationIds);

    const filteredObjects = objects.filter(obj =>
      !missingLocationIds.includes(obj.location_id) && obj.status === CompanyStatus.ACTIVED && this.isDateInPast(obj.created_at),
    );

    return filteredObjects;
  }

  async createCompanyWithLocation(item: any): Promise<boolean> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const company = await this.companyRepository.findOne({ where: { location_id: item.location_id } });

      if (company) {
        company.type = item.type;
        company.serial = item.serial;
        company.status = item.status;
        company.description = item.description;
        company.updated_at = new Date(item.updated_at * 1000);
        console.log(company, 'company')
        await queryRunner.manager.save(company);
        await queryRunner.commitTransaction();
      }

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  @Cron('*/1 * * * *') // Chạy mỗi phút
  async handleCron() {
    try {
      const response = await axios.get('https://669ce22d15704bb0e304842d.mockapi.io/assets');
      const data = response.data;

      const existeDataWithLocation = await this.filterObjectsByExistingLocations(data)

      for (const item of existeDataWithLocation) {
        await this.createCompanyWithLocation(item);
      }
    } catch (error) {
      console.error('Error in cron job:', error);
    }
  }
}