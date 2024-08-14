import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Location } from '../database/entities/locations.entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,

  ) {
  }

  async findMissingLocationIds(locationIds: number[]): Promise<number[]> {
    const existingLocations = await this.locationRepository
      .createQueryBuilder('location')
      .select('location.id')
      .where('location.id IN (:...locationIds)', { locationIds })
      .getMany();

    const existingLocationIds = existingLocations.map(loc => loc.id);

    const missingLocationIds = locationIds.filter(id => !existingLocationIds.includes(id));

    return missingLocationIds;
  }
}