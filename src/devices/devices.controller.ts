import { Controller } from '@nestjs/common';
import { DeviceService } from './devices.service';

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}
}
