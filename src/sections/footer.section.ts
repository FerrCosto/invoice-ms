import { Content } from 'pdfmake/interfaces';

export const footerSection = (
  currentPage: number,
  pageCount: number,
): Content => {
  return {
    text: `Pagina ${currentPage.toString()} de ${pageCount.toString()}`,
    alignment: 'right',
    bold: true,
    margin: [0, 20, 45, 0],
  };
};
