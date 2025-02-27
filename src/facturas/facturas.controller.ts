import { Controller } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { DataDto } from './dtos/fullData.dto';

@Controller()
export class FacturasController {
  constructor(private readonly facturasService: FacturasService) {}
  @MessagePattern('invoice.create')
  async createFactura(@Payload() dataDto: DataDto) {
    return this.facturasService.createFactura(dataDto);
  }
}
