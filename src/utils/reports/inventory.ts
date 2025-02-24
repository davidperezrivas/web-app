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
  const columnWidth = { product: 60, category: 50, count: 30, value: 40 };
  const pageHeight = 270;
  const lineHeight = 7;
  const rowPadding = 3; // Espacio adicional para separar filas

  const doc = new JSPDF({
    format: 'letter',
  }).setProperties({
    title: 'Control de inventario',
    creator: 'Servitek',
  });

  const enterprise = row[0]?.enterprise_name;
  const folio = row[0]?.folio;
  const rut = row[0]?.enterprise_rut;
  const line = '_______________________________________________________________';

  const total = row.reduce((acc: number, act: any) => acc + Number(act.last_value), 0);
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
    doc.text(
      'Valor Compra',
      leftMargin + columnWidth.product + columnWidth.category + columnWidth.count,
      currentHeight,
    );
    doc.text(line, leftMargin, (currentHeight += 5));

    currentHeight += 5;
  };

  addHeader();
  doc.setFontSize(13);
  doc.setTextColor('#515051');

  row.forEach((inventory: any) => {
    const { product, categoria, count, last_value } = inventory;
    const formatCount = formatNumber(count);
    const formatValue = formatTotal(last_value);

    // Divide el texto en líneas con un ancho fijo
    const productLines = doc.splitTextToSize(product, columnWidth.product);
    const categoryLines = doc.splitTextToSize(categoria.name, columnWidth.category);

    // Determinar la altura máxima de la fila
    const maxLines = Math.max(productLines.length, categoryLines.length);
    const rowHeight = maxLines * lineHeight + rowPadding;

    // Verificar si hay espacio en la página antes de imprimir
    if (currentHeight + rowHeight + 10 > pageHeight) {
      doc.addPage();
      currentHeight = 25;
      addHeader();
    }

    // Imprimir cada celda respetando la altura calculada
    doc.text(productLines, leftMargin, currentHeight);
    doc.text(categoryLines, leftMargin + columnWidth.product, currentHeight);
    doc.text(formatCount, leftMargin + columnWidth.product + columnWidth.category, currentHeight);
    doc.text(formatValue, leftMargin + columnWidth.product + columnWidth.category + columnWidth.count, currentHeight);

    currentHeight += rowHeight; // Ajustar el espacio para la siguiente fila
  });

  // Verificar espacio antes de la línea final
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

export default inventoryReport;
