import JSPDF from 'jspdf';
import { formatNumber, formatTotal } from '../functions/formatNumbers';
import dayjs from 'dayjs';

const allInventoryReport = ({ row }: any) => {
  const leftMargin = 20;

  const doc = new JSPDF({
    format: 'letter',
  }).setProperties({
    title: 'Control de inventario',
    creator: 'Servitek',
  });

  let total = 0;
  const line = '____________________________________________________';
  row.forEach((inventory: any, index: number) => {
    doc.setFontSize(20);
    doc.setTextColor('#174379');
    doc.text('Control Inventario', leftMargin, 25);

    doc.setFontSize(15);
    doc.setTextColor('#2B2B2B');

    doc.text('Servitek', leftMargin, 35);
    doc.text('Fecha: ' + dayjs().format('DD/MM/YYYY'), leftMargin, 40);

    doc.text('Nombre', leftMargin, 50);
    doc.text('Categoria', leftMargin + 40, 50);
    doc.text('Cantidad', leftMargin + 80, 50);
    doc.text('Valor Compra', leftMargin + 120, 50);
    doc.text(line, leftMargin, 55);

    doc.setFontSize(13);
    doc.setTextColor('#515051');

    const separation = 55 + (index + 1) * 7;
    const { product, categoria, count, avg_value, last_value } = inventory;

    const formatCount = formatNumber(count);
    const formatValue = formatTotal(avg_value);
    const formatLastValue = formatTotal(last_value);

    total += Number(count) * Number(avg_value);

    doc.text(product, leftMargin, separation);
    doc.text(categoria.name, leftMargin + 40, separation);
    doc.text(formatCount, leftMargin + 80, separation);
    doc.text(formatValue, leftMargin + 120, separation);
  });
  const finalHeight = 55 + Number(row.length) * 8;

  doc.setFontSize(15);
  doc.setTextColor('#2B2B2B');
  doc.text(line, leftMargin, finalHeight);
  doc.text('Total pagado: ' + formatTotal(total), leftMargin + 80, finalHeight + 8);

  return doc.save('control_inventario.pdf');
};

export default allInventoryReport;
