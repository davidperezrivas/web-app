import JSPDF from 'jspdf';

const formatNumber = (value: number): string => {
  return `${value.toLocaleString('es-CL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

const formatTotal = (value: number): string => {
  return `$ ${value.toLocaleString('es-CL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

const inventoryReport = ({ row }: any) => {
  const leftMargin = 20;

  const doc = new JSPDF({
    format: 'letter',
  }).setProperties({
    title: 'Control de inventario',
    creator: 'Servitek',
  });

  const enterprise = row[0].enterprise_name;
  const folio = row[0].folio;
  const rut = row[0].enterprise_rut;
  const line = '____________________________________________________';

  const total = row.reduce((acc: number, act: any) => {
    acc += Number(act.last_value);
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
  row.forEach((inventory: any, index: number) => {
    const separation = 55 + (index + 1) * 7;
    const { product, categoria, count, last_value } = inventory;

    const formatCount = formatNumber(count);
    const formatValue = formatTotal(last_value);

    doc.text(product, leftMargin, separation);
    doc.text(categoria.name, leftMargin + 40, separation);
    doc.text(formatCount, leftMargin + 80, separation);
    doc.text(formatValue, leftMargin + 120, separation);
  });

  const finalHeight = 55 + Number(row.length) * 8;
  console.log(row);
  doc.setFontSize(15);
  doc.setTextColor('#2B2B2B');
  doc.text(line, leftMargin, finalHeight);
  doc.text('Total pagado: ' + formatTotal(total), leftMargin + 80, finalHeight + 8);

  return doc.save('control_inventario.pdf');
};

export default inventoryReport;
