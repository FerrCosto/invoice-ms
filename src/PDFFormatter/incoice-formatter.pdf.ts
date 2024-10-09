import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { DataDto } from 'src/facturas/dtos/fullData.dto';
import { DateFormatter } from 'src/helpers/date-formatter.helper';

const logo: Content = {
  image: 'src/assets/logo-ferreteria.png',
  width: 120,
  height: 120,
  margin: [20, 20],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 26,
    bold: true,
    alignment: 'center',
    margin: [100, -10, 0, 0],
  },
  subHeader: {
    fontSize: 16,
    bold: true,
    alignment: 'center',
    margin: [100, 10, 0, 0],
  },
  pBuy: {
    fontSize: 12,
    bold: true,
    margin: [0, 60, 0, 30],
    alignment: 'center',
  },
  pRest: {
    fontSize: 12,
    alignment: 'center',
  },
};

export const InvoiceToPDF = (value: DataDto): TDocumentDefinitions => {
  const { order, user } = value;
  const { details, ...resData } = order;
  console.log(details);
  return {
    styles: styles,
    header: logo,
    pageMargins: [40, 60, 40, 60],
    content: [
      {
        text: 'LA MACHETA',
        style: 'header',
      },
      {
        text: 'Tu Ferretería de Confianza',
        style: 'subHeader',
      },
      {
        margin: [0, 25, 0, 25],
        columns: [
          {
            text: [
              {
                text: `Recibo No. #${order.id}\n`,
                bold: true,
              },
              {
                text: `Fecha del Recibo: `,
                bold: true,
              },
              ` ${DateFormatter.getDDMMMMYYYY(order.date_order)}\n`,
              {
                text: `Fecha de Pago: `,
                bold: true,
              },
              ` ${DateFormatter.getDDMMMMYYYY(new Date())}\n`,
            ],
            margin: [0, 45, 0, 25],
          },
          {
            text: [
              {
                text: `Destinatario: `,
                bold: true,
              },
              `${user.fullName}\n`,
              {
                text: `Dirección: `,
                bold: true,
              },
              ` ${user.direccion.street}, ${user.direccion.city}\n`,
              {
                text: `Código Postal:  `,
                bold: true,
              },
              `${user.direccion.postal}\n`,
            ],
            margin: [45, 45, 0, 25],
          },
        ],
      },

      {
        text: [
          {
            text: 'Información del Pedido: ',
            bold: true,
          },
        ],
      },
      {
        layout: 'customLayout',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'Producto', color: '#FFF', bold: true },
              { text: 'Descripción', color: '#FFF', bold: true },
              { text: 'Cantidad', color: '#FFF', bold: true },
              { text: 'Valor Unidad', color: '#FFF', bold: true },
              { text: 'Valor Total', color: '#FFF', bold: true },
            ],

            ...details.map((detail) => [
              detail.name || 'Sin nombre',
              detail.description || 'Sin descripción',
              detail.quantity || 0,
              detail.price || 'N/A',
              detail.totalPrice || 'N/A',
            ]),
            [
              'Total',
              '---------------------------------------------------------',
              '-------------------',
              '--------------------',
              `${order.totalAmount}`,
            ],
          ],
        },
      },

      {
        text: '¡Gracias por tu compra en LA MACHETA!\n',
        style: 'pBuy',
      },
      {
        text: 'Con las herramientas correctas, todo es posible.\n Esperamos verte pronto y ser parte de tus próximos proyectos.\n¡Que tengas un excelente día!',
        style: 'pRest',
      },
      {
        text: 'Para más Información sobre pedidos y envíos consulta a:\n',
        fontSize: 12,
        margin: [0, 50, 0, 30],
        alignment: 'left',
      },
      {
        qr: 'https://google.com',
        fit: 75,
        alignment: 'left',
      },
    ],
  };
};
