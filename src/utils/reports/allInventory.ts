import JSPDF from 'jspdf';
import { formatNumber, formatTotal } from '../functions/formatNumbers';

const allInventoryReport = ({ row }: any) => {
  const leftMargin = 20;

  const doc = new JSPDF({
    format: 'letter',
  }).setProperties({
    title: 'Control de inventario',
    creator: 'Servitek',
  });

  row.forEach((inventory: any, index: number) => {
    const enterprise = inventory.enterprise_name;
    const folio = inventory.folio;
    const rut = inventory.enterprise_rut;
    const line = '____________________________________________________';

    const total = inventory.products.reduce((acc: number, act: any) => {
      acc += Number(act.purchase_value);
      return acc;
    }, 0);

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
    doc.text('Valor Compra', leftMargin + 120, 50);
    doc.text(line, leftMargin, 55);

    doc.setFontSize(13);
    doc.setTextColor('#515051');
    inventory.products.forEach((inv: any, index: number) => {
      const separation = 55 + (index + 1) * 7;
      const { product_name, categoria, count, purchase_value } = inv;

      const formatCount = formatNumber(count);
      const formatValue = formatTotal(purchase_value);

      doc.text(product_name, leftMargin, separation);
      doc.text(categoria.name, leftMargin + 40, separation);
      doc.text(formatCount, leftMargin + 80, separation);
      doc.text(formatValue, leftMargin + 120, separation);
    });

    const finalHeight = 55 + Number(row.length) * 8;

    doc.setFontSize(15);
    doc.setTextColor('#2B2B2B');
    doc.text(line, leftMargin, finalHeight);
    doc.text('Total pagado: ' + formatTotal(total), leftMargin + 80, finalHeight + 8);

    if (index + 1 < row.length) {
      doc.addPage();
    }
  });

  return doc.save('control_inventario.pdf');
};

export default allInventoryReport;
