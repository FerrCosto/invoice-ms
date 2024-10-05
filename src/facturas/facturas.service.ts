import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { InvoiceToPDF, Order } from 'src/PDFFormatter/incoice-formatter.pdf';
import { PrinterService } from '../printer/printer.service';
import { OrderDto } from './dtos/order.dto';
import { Readable } from 'stream';

@Injectable()
export class FacturasService {
  constructor(
    @Inject(NATS_SERVICE) private client: ClientProxy,
    private readonly printerService: PrinterService,
  ) {}

  async createFactura(order: OrderDto) {
    const docDefinition = InvoiceToPDF({ data: order as any });
    const doc = await this.printerService.createPdf(docDefinition);

    return doc.toString('base64');
  }
}
