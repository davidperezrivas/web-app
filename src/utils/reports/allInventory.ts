import JSPDF from 'jspdf';
import { formatNumber, formatTotal } from '../functions/formatNumbers';
import dayjs from 'dayjs';

const allInventoryReport = ({ row }: any) => {
  const leftMargin = 20;
  const maxWidth = 35; // Máximo ancho para el nombre del producto
  const pageHeight = 270; // Altura máxima antes de hacer un salto de página

  const doc = new JSPDF({ format: 'letter' }).setProperties({
    title: 'Control de inventario',
    creator: 'Servitek',
  });

  let total = 0;
  const line = '_______________________________________________________________';

  const addHeader = (doc: any, currentHeight: number) => {
    doc.setFontSize(20);
    doc.setTextColor('#174379');
    doc.text('Control Inventario', leftMargin, currentHeight);

    doc.setFontSize(15);
    doc.setTextColor('#2B2B2B');
    doc.text('Servitek', leftMargin, currentHeight + 10);
    doc.text('Fecha: ' + dayjs().format('DD/MM/YYYY'), leftMargin, currentHeight + 15);

    doc.text('Nombre', leftMargin, currentHeight + 25);
    doc.text('Categoria', leftMargin + 60, currentHeight + 25);
    doc.text('Cantidad', leftMargin + 110, currentHeight + 25);
    doc.text('Valor Compra', leftMargin + 150, currentHeight + 25);
    doc.text(line, leftMargin, currentHeight + 30);

    return currentHeight + 35;
  };

  let currentHeight = addHeader(doc, 25);
  doc.setFontSize(13);
  doc.setTextColor('#515051');

  row.forEach((inventory: any) => {
    const { product, categoria, count, avg_value } = inventory;
    const formatCount = formatNumber(count);
    const formatValue = formatTotal(avg_value);
    total += Number(count) * Number(avg_value);

    // Dividir el nombre del producto si es muy largo
    const productLines = doc.splitTextToSize(product, maxWidth);
    const lineHeight = 7;
    const productHeight = productLines.length * lineHeight;

    // Verificar si hay que hacer un salto de página
    if (currentHeight + productHeight + 10 > pageHeight) {
      doc.addPage();
      currentHeight = addHeader(doc, 25); // Reiniciar la altura con el nuevo encabezado
    }

    doc.text(productLines, leftMargin, currentHeight);
    doc.text(categoria.name, leftMargin + 60, currentHeight);
    doc.text(formatCount, leftMargin + 110, currentHeight);
    doc.text(formatValue, leftMargin + 150, currentHeight);

    currentHeight += productHeight + 2; // Ajuste dinámico
  });

  // Verificar si hay espacio para la línea final
  if (currentHeight + 10 > pageHeight) {
    doc.addPage();
    currentHeight = addHeader(doc, 25); // Reiniciar la altura en la nueva página
  }

  doc.setFontSize(15);
  doc.setTextColor('#2B2B2B');
  doc.text(line, leftMargin, currentHeight);
  doc.text('Total pagado: ' + formatTotal(total), leftMargin + 110, currentHeight + 8);

  const pdfUrl = doc.output('bloburl');
  return pdfUrl; // Retorna la URL para previsualización
};

export default allInventoryReport;
