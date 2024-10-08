import { Injectable } from '@nestjs/common';

import PdfPrinter from 'pdfmake';
import type {
  BufferOptions,
  CustomTableLayout,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { Readable } from 'stream';

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf',
  },
};

const customTableLayouts: Record<string, CustomTableLayout> = {
  customLayout: {
    hLineWidth: function (i, node) {
      if (i === 0 || i === node.table.body.length) {
        return 0;
      }
      return i === node.table.headerRows ? 2 : 1;
    },
    vLineWidth: function (i) {
      return 0;
    },
    hLineColor: function (i) {
      return i === 1 ? 'black' : '#aaa';
    },
    paddingLeft: function (i) {
      return i === 0 ? 0 : 8;
    },
    paddingRight: function (i, node) {
      return i === node.table.widths.length - 1 ? 0 : 8;
    },
    fillColor: function (i, node) {
      if (i === 0) {
        return '#747474';
      }
      if (i === node.table.body.length - 1) {
        return '#F2F2F2';
      }
      return i % 2 === 0 ? '#FFFFFF' : null;
    },
  },
};

@Injectable()
export class PrinterService {
  private printer = new PdfPrinter(fonts);

  async createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = { tableLayouts: customTableLayouts },
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const pdfDoc = this.printer.createPdfKitDocument(docDefinition, options);
      const chunks: Buffer[] = [];

      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.on('error', (err) => reject(err));

      pdfDoc.end();
    });
  }
}
