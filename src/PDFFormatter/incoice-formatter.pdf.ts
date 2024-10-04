import { TDocumentDefinitions } from 'pdfmake/interfaces';

interface ReportValue {
  title?: string;
  subTitle?: string;
  data: null;
}
export const InvoiceToPDF = (value: ReportValue): TDocumentDefinitions => {
  const { title, subTitle, data } = value;
  return;
};
