import { Controller } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { OrderDto } from './dtos/order.dto';
import { Readable } from 'stream';

@Controller()
export class FacturasController {
  constructor(private readonly facturasService: FacturasService) {}
  @MessagePattern('factura.create')
  async createFactura(@Payload() order: OrderDto) {
    return this.facturasService.createFactura(order);
  }
}
