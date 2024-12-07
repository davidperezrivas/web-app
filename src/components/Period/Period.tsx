// Importaciones agrupadas y ordenadas
import Breadcrumb from '../../storybook/components/Breadcrumbs/Breadcrumbs';
import Table from '../../storybook/components/Table/Table';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createDebt, getActivePeriod } from './services/period.service';
import PlusIcon from '../../storybook/icons/plus';
import Button from '../../storybook/components/Button/Button';
import Toast from '../../storybook/components/Toast/Toast';
import SkeletonTable from '../../storybook/components/Skeleton/SkeletonTable';
import { useEffect, useMemo, useState } from 'react';
import { ICellRendererParams, ValueFormatterParams } from 'ag-grid-community';

import Update from '../../storybook/icons/update';
import IPeriod from './models/Period';

const Period = () => {
  const queryClient = useQueryClient();

  // Estado para manejar el mensaje de Toast (exitoso, error, etc.)
  const [showToast, setShowToast] = useState<{
    show: boolean;
    msg: string;
    type: 'error' | 'success' | 'warning' | 'info';
  }>({
    show: false,
    msg: '',
    type: 'info', // Valor inicial del tipo de mensaje
  });

  // Hook para obtener datos del periodo activo usando React Query
  const { isLoading, isError, data } = useQuery<IPeriod[]>({
    queryKey: ['getPeriod'],
    queryFn: async () => getActivePeriod(),
    refetchOnWindowFocus: false, // Evita recargar los datos al reenfocar la ventana
  });

  // Mutación para crear deuda al actualizar el periodo
  const createDebtMutation = useMutation({
    mutationFn: createDebt,
    onSuccess(data) {
      // Invalida las consultas para obtener el periodo actualizado
      queryClient.invalidateQueries({ queryKey: ['getPeriod'] });
      setShowToast({ show: true, msg: 'Se ha actualizado el periodo.', type: 'success' });
    },
    onError(error) {
      // Muestra un mensaje de error si ocurre un fallo
      setShowToast({ show: true, msg: 'Ha ocurrido un error, favor intentarlo nuevamente.', type: 'error' });
    },
  });

  // Función para manejar el cambio de periodo (al crear deuda)
  const handlePeriod = (id: string) => {
    createDebtMutation.mutate({ id });
  };

  // Efecto que se ejecuta si ocurre un error al obtener los datos
  useEffect(() => {
    if (isError) {
      setShowToast({ show: true, msg: 'Ha ocurrido un error, favor comunicarse con el administrador.', type: 'error' });
    }
  }, [isError]);

  // Mapea los datos de los periodos para la tabla
  const rowData = useMemo(() => {
    return data?.map((period) => {
      return {
        year: period.year,
        amount: period.amount,
        current: period.current,
        id: period.id,
      };
    });
  }, [data]);

  // Definición de columnas para la tabla
  /* eslint-disable react-hooks/exhaustive-deps */
  const colDefs = useMemo(() => {
    return [
      { field: 'year', headerName: 'Año', minWidth: 150, flex: 1 },
      {
        field: 'amount',
        headerName: 'Matricula',
        minWidth: 150,
        flex: 1,
        valueFormatter: (params: ValueFormatterParams<any, number>) => {
          // Formatea el monto en pesos chilenos
          return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0, // En Chile no se suelen mostrar decimales
          }).format(params.value ?? 0);
        },
      },
      {
        headerName: '',
        flex: 1,
        cellRenderer: (props: ICellRendererParams<any, number>) => {
          if (!props.data.current) {
            return (
              <div className="flex justify-center items-center">
                {/* Botón para cambiar el periodo al actual */}
                <Button text={''} status={'info'} icon={<Update />} onClick={() => handlePeriod(props.data.id)} />
              </div>
            );
          }
        },
        minWidth: 300,
      },
    ];
  }, []); /* eslint-disable react-hooks/exhaustive-deps */

  return (
    <section className="w-full p-5 ">
      <section className="w-full px-2 md:px-6 text-xl text-gray-800 leading-normal ">
        <section className="drop-shadow-md bg-white box-content box-border">
          <Breadcrumb />
          {/* Título y mensaje introductorio del módulo */}
          <span className="text-base md:text-sm text-green-500 font-bold">
            <h1 className="font-bold break-normal text-blue-500 pt-6 pb-2 text-3xl md:text-4xl pl-5">Periodo</h1>
            <small className="break-normal text-gray-400 pt-6 pb-2 text-sm pl-5 italic">
              Modulo encargado de generar diversos periodos anuales, con la finalidad de ordenar pagos, generar deudas
              anuales y similares.
            </small>
          </span>
          {/* Mostramos el Toast si hay algún mensaje */}
          {showToast.show || isError ? <Toast text={showToast.msg} type={showToast.type} /> : null}
        </section>

        {/* Sección para la tabla de periodos */}
        <section className="drop-shadow-md bg-white box-content box-border min-h-32 px-2 md:px-14 py-10">
          <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1">
            <section className="flex justify-end pb-4">
              <div>
                {/* Botón para crear un nuevo usuario (aún no implementado en este contexto) */}
                <Button text={'Crear Usuario'} status={'info'} icon={<PlusIcon />} />
              </div>
            </section>
          </section>

          {/* Muestra el Skeleton mientras carga o la tabla cuando los datos están disponibles */}
          <section className="min-h-full">
            {isLoading ? <SkeletonTable /> : <Table headers={colDefs} information={rowData} />}
          </section>
        </section>
      </section>
    </section>
  );
};

export default Period;
