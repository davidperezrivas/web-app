import JSPDF from 'jspdf';
import { formatNumber, formatTotal } from '../functions/formatNumbers';

const sellReport = ({ row, allInventory }: any) => {
  console.log(row);
  const leftMargin = 20;

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

  doc.setFontSize(20);
  doc.setTextColor('#174379');
  doc.text(enterprise, leftMargin, 25);

  doc.setFontSize(15);
  doc.setTextColor('#2B2B2B');

  doc.text('Factura N°: ' + folio, leftMargin, 35);
  doc.text('Rut: ' + rut, leftMargin, 40);

  doc.text('Nombre', leftMargin, 50);
  doc.text('Categoria', leftMargin + 40, 50);
  doc.text('Cantidad', leftMargin + 80, 50);
  doc.text('Valor Venta', leftMargin + 120, 50);
  doc.text(line, leftMargin, 55);

  doc.setFontSize(13);
  doc.setTextColor('#515051');

  let total = 0;
  row.product.forEach((inventory: any, index: number) => {
    const separation = 55 + (index + 1) * 7;
    const { product, count } = inventory;
    const foundProduct = allInventory.find((inventory: any) => inventory.product.trim() === product.trim());

    const formatCount = formatNumber(count);
    const productValue = Number(foundProduct.avg_value) * 1.2;
    const formatValue = formatTotal(count * productValue);
    total += count * productValue;

    doc.text(product, leftMargin, separation);
    doc.text(foundProduct.categoria.name, leftMargin + 40, separation);
    doc.text(formatCount, leftMargin + 80, separation);
    doc.text(formatValue, leftMargin + 120, separation);
  });

  const finalHeight = 55 + Number(row.product.length) * 8;
  // // console.log(row);
  doc.setFontSize(15);
  doc.setTextColor('#2B2B2B');
  doc.text(line, leftMargin, finalHeight);
  doc.text('Total pagado: ' + formatTotal(total), leftMargin + 80, finalHeight + 8);

  return doc.save(`ventas_${row.purchase_date}_${row.folio}.ventas.pdf`);
};

export default sellReport;
