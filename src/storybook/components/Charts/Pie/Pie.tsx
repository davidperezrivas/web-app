import { ResponsivePie } from '@nivo/pie';
import { PieProps } from './models/Pie';

const PieChart = ({ data, tittle }: PieProps) => {
  return (
    <div style={{ height: '500px' }}>
      <section className="bg-white box-content box-border">
        {/* Título y mensaje de error */}
        <span className="text-base md:text-sm text-green-500 font-bold">
          <h1 className="font-bold break-normal text-stone-700 pt-6 pb-2 text-lg pl-5 italic">{tittle}</h1>
        </span>
      </section>
      <ResponsivePie
        data={data} // Datos que se van a mostrar en el gráfico.
        margin={{ top: 20, right: 80, bottom: 80, left: 80 }} // Define los márgenes alrededor del gráfico.
        innerRadius={0.5} // Radio interior del gráfico, lo convierte en un gráfico tipo "donut".
        padAngle={0.7} // Espaciado entre los sectores del gráfico. Un valor mayor crea más espacio.
        cornerRadius={3} // Bordes redondeados para los sectores.
        activeOuterRadiusOffset={8} // Efecto de hover, ajusta el radio exterior cuando el cursor pasa sobre un sector.
        colors={{ scheme: 'nivo' }} // Establece el esquema de colores para los sectores del gráfico.
        borderWidth={1} // Define el grosor de los bordes de los sectores.
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.2]], // Oscurece el color del borde en un 20%
        }} // Establece el color de los bordes, en este caso se oscurece ligeramente.
        arcLinkLabelsSkipAngle={10} // Si el ángulo de un sector es menor que este valor, no se mostrarán las etiquetas de los enlaces.
        arcLinkLabelsTextColor="#333333" // Establece el color del texto de las etiquetas de los enlaces.
        arcLinkLabelsThickness={2} // Ajusta el grosor de las líneas de enlace que conectan las etiquetas con los arcos.
        arcLinkLabelsColor={{ from: 'color' }} // Establece el color de las líneas de enlace basadas en el color del sector.
        arcLabelsSkipAngle={10} // Si el ángulo de un sector es menor que este valor, no se mostrarán las etiquetas dentro del gráfico.
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', 2]], // Oscurece el color del texto dentro de los arcos.
        }} // Establece el color del texto de las etiquetas dentro de los arcos, con un modificador para oscurecerlo.
        legends={[
          // Configuración de la leyenda del gráfico.
          {
            anchor: 'bottom', // Posiciona la leyenda en la parte inferior del gráfico.
            direction: 'row', // Configura la dirección de los ítems de la leyenda (horizontal en este caso).
            justify: false, // No justifica los ítems (los deja alineados a la izquierda).
            translateX: 0, // Desplaza la leyenda a lo largo de los ejes X y Y.
            translateY: 56,
            itemsSpacing: 0, // Define el espacio entre los elementos de la leyenda.
            itemWidth: 100, // Define el tamaño de cada ítem de la leyenda.
            itemHeight: 18,
            itemTextColor: '#999', // Color del texto de los ítems de la leyenda.
            itemDirection: 'left-to-right', // Dirección de los ítems de la leyenda (de izquierda a derecha).
            itemOpacity: 1, // Opacidad de los ítems de la leyenda.
            symbolSize: 18, // Tamaño del símbolo de cada ítem en la leyenda (círculo en este caso).
            symbolShape: 'circle', // Forma del símbolo en la leyenda (círculo en este caso).
            // Efectos de hover para los ítems de la leyenda.
            effects: [
              {
                on: 'hover', // Cuando el cursor pasa sobre el ítem de la leyenda.
                style: {
                  // Cambia el color del texto del ítem al pasar el cursor.
                  itemTextColor: '#000',
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default PieChart;
