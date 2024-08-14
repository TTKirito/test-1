
import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Location } from '../entities/locations.entities';
import { Company } from '../entities/company.entities';
import { CompanyStatus } from 'src/companies/utils/company-status.enum';

@Injectable()
export class LocationSeedService {
  constructor(private readonly connection: Connection) {}

  async seed() {
    const locations: Partial<Location>[] = [
      { name: 'Da Nang' },
      { name: 'Ha Noi' },
      { name: 'Ho Chi Minh' },
      { name: 'Nha Trang' },
      { name: 'Can Tho' },
    ];

    const companies: Partial<Company>[] = [
      { organization: 'PNS', status: CompanyStatus.ACTIVED, location_id: 1 },
      { organization: 'PNS', status: CompanyStatus.UNACTIVE, location_id: 2 },
      { organization: 'PNS', status: CompanyStatus.ACTIVED, location_id: 3 },
      { organization: 'PLJ', status: CompanyStatus.ACTIVED, location_id: 4 },
      { organization: 'PLJ', status: CompanyStatus.ACTIVED, location_id: 5 },
    ];

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      // await queryRunner.manager.save(Location, locations);
      // await queryRunner.manager.save(Company, companies);
      
      await queryRunner.commitTransaction();
      console.log('done');
    } catch (error) {
      console.log(error, 'error')
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
