import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { CurrencyFormatter } from 'src/helpers/currency-formatter.helper';
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
};

export interface Order {
  id: number;
  date_order: Date;
  status: string;
  paid: boolean;
  details: Detail[];
  totalAmount: string;
}

export interface Detail {
  id: number;
  quantity: number;
  price: string;
  description: string;
  name: string[];
  img: Array<Img[]>;
  totalPrice: string;
}

export interface Img {
  url: string;
  alt: string;
  state_image: string;
}
interface ReportValue {
  title?: string;
  subTitle?: string;
  data: Order;
}
export const InvoiceToPDF = (value: ReportValue): TDocumentDefinitions => {
  const { title, subTitle, data } = value;
  console.log(data);
  const { details, paid, status } = data;
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
        margin: [0, 25],
        columns: [
          {
            text: [
              {
                text: `Recibo No. #${data.id}\n`,
                bold: true,
              },
              {
                text: `Fecha del Recibo: `,
                bold: true,
              },
              ` ${DateFormatter.getDDMMMMYYYY(data.date_order)}\n`,
              {
                text: `Fecha de Pago: `,
                bold: true,
              },
              ` ${DateFormatter.getDDMMMMYYYY(new Date())}\n`,
            ],
            marginTop: 45,
          },
          {
            text: [
              {
                text: `Destinatario: `,
                bold: true,
              },
              `Kevin Salamanca\n`,
              {
                text: `Dirección: `,
                bold: true,
              },
              ` Cra 15A #53-04, El Oasis\n`,
              {
                text: `Código Postal: : `,
                bold: true,
              },
              `681001\n`,
            ],
            margin: [45, 45, 0, 0],
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
              '-------',
              '---------',
              '--------',
              `${data.totalAmount}`,
            ],
          ],
        },
      },
    ],
  };
};
