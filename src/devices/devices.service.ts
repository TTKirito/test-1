import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Connection, Repository } from 'typeorm';
import { Company } from '../database/entities/company.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { LocationsService } from 'src/locations/locations.service';
import { DeviceStatus } from './utils/device-status.enum';
import { Device } from 'src/database/entities/device.entities';
import { CompanyDevice } from 'src/database/entities/companyDevice.entities';
import { CompanyStatus } from 'src/companies/utils/company-status.enum';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,

    @InjectRepository(Company)
    private companyRepository: Repository<Company>,

    @InjectRepository(CompanyDevice)
    private companyDeviceRepository: Repository<CompanyDevice>,

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
      !missingLocationIds.includes(obj.location_id) && obj.status === DeviceStatus.ACTIVED && this.isDateInPast(obj.created_at),
    );

    return filteredObjects;
  }

  async updateDeviceWithLocation(item: any): Promise<boolean> {
    const company = await this.companyRepository.find({ where: { location_id: item.location_id, status: CompanyStatus.ACTIVED } });

    if (!company || company && company.length > 0) return;

    let queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      let newDevice = await this.deviceRepository.findOne({ where: { serial: item.serial } });

      if (!newDevice) {
        newDevice = new Device()
      }

      newDevice.type = item.type,
      newDevice.serial = item.serial,
      newDevice.status = item.status,
      newDevice.description = item.description
      newDevice.updated_at = new Date(item.updated_at * 1000)
      const device = await queryRunner.manager.save(newDevice);

      await Promise.all(company.map(async cp => {
        let newCompanyDevice = await this.companyDeviceRepository.findOne({ where: { device_id: device.id, company_id: cp.id } });

        if (!newCompanyDevice) {
          newCompanyDevice = new CompanyDevice()
        }

        newCompanyDevice.company_id = cp.id,
        newCompanyDevice.device_id = device.id
        await queryRunner.manager.save(newCompanyDevice);
      }))

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }

    return true
  }

  @Cron('*/1 * * * *') // Chạy mỗi phút
  async handleCron() {
    try {
      const response = await axios.get('https://669ce22d15704bb0e304842d.mockapi.io/assets');
      const data = response.data;
      const filteredData = await this.filterObjectsByExistingLocations(data);
      for (const item of filteredData) {
        await this.updateDeviceWithLocation(item);
      }

    } catch (error) {
      console.error('Error in cron job:', error);
    }
  }
}