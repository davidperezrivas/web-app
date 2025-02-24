import JSPDF from 'jspdf';
import { formatNumber, formatTotal } from '../functions/formatNumbers';

const sellReport = ({ row, allInventory }: any) => {
  const leftMargin = 20;
  const columnWidth = { product: 60, category: 50, count: 30, value: 40 };
  const pageHeight = 270;
  const lineHeight = 7;
  const rowPadding = 3;

  const doc = new JSPDF({
    format: 'letter',
  }).setProperties({
    title: 'Control de inventario',
    creator: 'Servitek',
  });

  const enterprise = row.enterprise_name;
  const folio = row.folio;
  const rut = row.enterprise_rut;
  const line = '____________________________________________________';

  let currentHeight = 25;

  const addHeader = () => {
    doc.setFontSize(20);
    doc.setTextColor('#174379');
    doc.text(enterprise, leftMargin, currentHeight);

    doc.setFontSize(15);
    doc.setTextColor('#2B2B2B');
    doc.text('Factura N°: ' + folio, leftMargin, (currentHeight += 10));
    doc.text('Rut: ' + rut, leftMargin, (currentHeight += 5));

    doc.text('Nombre', leftMargin, (currentHeight += 10));
    doc.text('Categoria', leftMargin + columnWidth.product, currentHeight);
    doc.text('Cantidad', leftMargin + columnWidth.product + columnWidth.category, currentHeight);
    doc.text('Valor Venta', leftMargin + columnWidth.product + columnWidth.category + columnWidth.count, currentHeight);
    doc.text(line, leftMargin, (currentHeight += 5));

    currentHeight += 5;
  };

  addHeader();
  doc.setFontSize(13);
  doc.setTextColor('#515051');

  let total = 0;
  row.product.forEach((inventory: any) => {
    const { product, count } = inventory;
    const foundProduct = allInventory.find((inventory: any) => inventory.product.trim() === product.trim());

    const formatCount = formatNumber(count);
    const productValue = Number(foundProduct.avg_value) * 1.2;
    const formatValue = formatTotal(count * productValue);
    total += count * productValue;

    const productLines = doc.splitTextToSize(product, columnWidth.product);
    const categoryLines = doc.splitTextToSize(foundProduct.categoria.name, columnWidth.category);

    const maxLines = Math.max(productLines.length, categoryLines.length);
    const rowHeight = maxLines * lineHeight + rowPadding;

    if (currentHeight + rowHeight + 10 > pageHeight) {
      doc.addPage();
      currentHeight = 25;
      addHeader();
    }

    doc.text(productLines, leftMargin, currentHeight);
    doc.text(categoryLines, leftMargin + columnWidth.product, currentHeight);
    doc.text(formatCount, leftMargin + columnWidth.product + columnWidth.category, currentHeight);
    doc.text(formatValue, leftMargin + columnWidth.product + columnWidth.category + columnWidth.count, currentHeight);

    currentHeight += rowHeight;
  });

  if (currentHeight + 10 > pageHeight) {
    doc.addPage();
    currentHeight = 25;
    addHeader();
  }

  doc.setFontSize(15);
  doc.setTextColor('#2B2B2B');
  doc.text(line, leftMargin, currentHeight);
  doc.text(
    'Total pagado: ' + formatTotal(total),
    leftMargin + columnWidth.product + columnWidth.category,
    currentHeight + 8,
  );

  const pdfUrl = doc.output('bloburl');
  return pdfUrl; // Retorna la URL para previsualización
};

export default sellReport;
