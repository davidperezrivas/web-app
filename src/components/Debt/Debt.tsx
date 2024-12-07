// Importaciones de componentes internos
import Breadcrumb from '../../storybook/components/Breadcrumbs/Breadcrumbs';
import Table from '../../storybook/components/Table/Table';
import Toast from '../../storybook/components/Toast/Toast';
import SkeletonTable from '../../storybook/components/Skeleton/SkeletonTable';

// Importaciones de hooks y funciones
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

// Importaciones de servicios y modelos
import { getAllDebts } from './services/debt.service';
import IDebt from './models/Debt';

// Importaciones de la comunidad de ag-Grid
import { ValueFormatterParams } from 'ag-grid-community';

const Debt = () => {
  // Estado para mostrar el mensaje de Toast (notificación)
  const [showToast, setShowToast] = useState<{
    show: boolean;
    msg: string;
    type: 'error' | 'success' | 'warning' | 'info';
  }>({
    show: false,
    msg: '',
    type: 'info', // Valor inicial del tipo de mensaje
  });

  // Hook para obtener datos de las deudas utilizando React Query
  const { isLoading, isError, data } = useQuery<IDebt[]>({
    queryKey: ['getDebts'], // Clave de la consulta para React Query
    queryFn: async () => getAllDebts(), // Función que obtiene las deudas
    refetchOnWindowFocus: false, // Evita la recarga de datos al reenfocar la ventana
  });

  // Manejo de errores: muestra un mensaje de error si la consulta falla
  useEffect(() => {
    if (isError) {
      setShowToast({
        show: true,
        msg: 'Ha ocurrido un error, favor comunicarse con el administrador.',
        type: 'error',
      });
    }
  }, [isError]); // Dependencia de isError para mostrar el mensaje cuando sea necesario

  // Mapea los datos de las deudas para adaptarlos a las filas de la tabla
  const rowData = useMemo(() => {
    return data?.map((debt) => {
      return {
        name: debt.user.name,
        rut: debt.user.rut,
        email: debt.user.email,
        total: debt.total,
      };
    });
  }, [data]); // Se vuelve a ejecutar cuando los datos cambian

  // Definición de las columnas de la tabla
  const colDefs = useMemo(() => {
    return [
      { field: 'name', headerName: 'Nombre', minWidth: 150, flex: 1 },
      { field: 'rut', headerName: 'Rut', minWidth: 150, flex: 1 },
      { field: 'email', headerName: 'Correo', minWidth: 150, flex: 1 },
      {
        field: 'total',
        headerName: 'Deuda Total',
        minWidth: 150,
        flex: 1,
        valueFormatter: (params: ValueFormatterParams<any, number>) => {
          // Formateo del número al estilo chileno
          return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0, // En Chile no se usan decimales para los montos
          }).format(params.value ?? 0);
        },
      },
    ];
  }, []); // Definición estática de las columnas

  return (
    <section className="w-full p-5 ">
      <section className="w-full px-2 md:px-6 text-xl text-gray-800 leading-normal ">
        <section className="drop-shadow-md bg-white box-content box-border">
          {/* Componente de Breadcrumbs para la navegación */}
          <Breadcrumb />
          {/* Título y descripción de la sección */}
          <span className="text-base md:text-sm text-green-500 font-bold">
            <h1 className="font-bold break-normal text-blue-500 pt-6 pb-2 text-3xl md:text-4xl pl-5">Deudas</h1>
            <small className="break-normal text-gray-400 pt-6 pb-2 text-sm pl-5 italic">
              Módulo encargado de mostrar todas las deudas agrupadas por usuario.
            </small>
          </span>
          {/* Mostrar notificación Toast si es necesario */}
          {showToast.show || isError ? <Toast text={showToast.msg} type={showToast.type} /> : null}
        </section>

        {/* Sección de la tabla con las deudas */}
        <section className="drop-shadow-md bg-white box-content box-border min-h-32 px-2 md:px-14 py-10">
          {/* Renderiza Skeleton mientras los datos están cargando o la tabla de deudas */}
          <section className="min-h-full">
            {isLoading ? <SkeletonTable /> : <Table headers={colDefs} information={rowData} />}
          </section>
        </section>
      </section>
    </section>
  );
};

export default Debt;
