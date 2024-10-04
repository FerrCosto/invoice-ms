import { Controller } from '@nestjs/common';
import { FacturasService } from './facturas.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Response } from 'express';

@Controller()
export class FacturasController {
  constructor(private readonly facturasService: FacturasService) {}
  @MessagePattern('factura.create')
  createFactura(@Payload() id: number, response: Response) {
    const pdfDoc = this.facturasService.createFactura(id);
    response.setHeader('Content-Type', 'application/pdf');
  }
}
