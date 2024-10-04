import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { InvoiceToPDF } from 'src/PDFFormatter/incoice-formatter.pdf';
import { PrinterService } from '../printer/printer.service';

@Injectable()
export class FacturasService {
  constructor(
    @Inject(NATS_SERVICE) private client: ClientProxy,
    private readonly printerService: PrinterService,
  ) {}

  async createFactura(id: number) {
    const order = this.client.send('order.findOne', id);
    const docDefinition = InvoiceToPDF({ data: order as any });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
