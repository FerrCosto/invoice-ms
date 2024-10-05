import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers/date-formatter.helper';

const logo: Content = {
  image: 'src/assets/logo-ferreteria.png',
  width: 100,
  height: 30,
  margin: [10, 20, 0, 0],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 20,
    bold: true,
    margin: [0, 30, 0, 0],
  },
  subHeader: {
    fontSize: 16,
    bold: true,
    margin: [0, 20, 0, 0],
  },
};

export interface Order {
  id: number;
  date_order: Date;
  status: string;
  paid: boolean;
  details: Detail[];
}

export interface Detail {
  id: number;
  quantity: number;
  price: string;
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

  const { details, paid, status } = data;

  return {
    styles: styles,
    header: logo,
    pageMargins: [40, 60, 40, 60],
    content: [
      {
        text: 'Factura',
        style: 'header',
      },
      {
        margin: [0, 25],
        columns: [
          {
            text: '15 Montgomery Str, Suite 100, \n Ottawa ON K2Y 9X1, CANADA\n BN: 12783671823\n https://devtalles.com',
          },
          {
            text: [
              {
                text: `Recibo No. #${data.id}\n`,
                bold: true,
              },
              `Fecha del Recibo ${DateFormatter.getDDMMMMYYYY(
                data.date_order,
              )} \nFecha del pago ${DateFormatter.getDDMMMMYYYY(new Date())}`,
            ],
            alignment: 'right',
          },
        ],
      },
    ],
  };
};
