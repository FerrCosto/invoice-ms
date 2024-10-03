import { Controller } from '@nestjs/common';
import { FacturasService } from './facturas.service';

@Controller()
export class FacturasController {
  constructor(private readonly facturasService: FacturasService) {}
}
