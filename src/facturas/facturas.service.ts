import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { InvoiceToPDF } from 'src/PDFFormatter/incoice-formatter.pdf';
import { PrinterService } from '../printer/printer.service';
import { DataDto } from './dtos/fullData.dto';

@Injectable()
export class FacturasService {
  constructor(
    @Inject(NATS_SERVICE) private client: ClientProxy,
    private readonly printerService: PrinterService,
  ) {}

  async createFactura(dataDto: DataDto) {
    const docDefinition = InvoiceToPDF(dataDto);
    const doc = await this.printerService.createPdf(docDefinition);

    return doc.toString('base64');
  }
}
