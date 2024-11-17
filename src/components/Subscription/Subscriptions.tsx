import Breadcrumb from '../../storybook/components/Breadcrumbs/Breadcrumbs';
import Table from '../../storybook/components/Table/Table';

import { useQuery } from '@tanstack/react-query';
import Subsciption from './models/Subscription'; // Importando el modelo Subscription
import { getAllSubscription } from './services/subscription.service'; // Servicio para obtener todas las suscripciones
import PlusIcon from '../../storybook/icons/plus';
import Button from '../../storybook/components/Button/Button';
import Toast from '../../storybook/components/Toast/Toast';
import SkeletonTable from '../../storybook/components/Skeleton/SkeletonTable';
import { useMemo, useState } from 'react';
import { ICellRendererParams } from 'ag-grid-community'; // Para el renderizado de celdas en la tabla
import CreateModalUser from './modals/upsertModal'; // Modal para crear/actualizar suscripción
import EditIcon from '../../storybook/icons/edit';
import DeleteIcon from '../../storybook/icons/delete';
import DeleteModalSubs from './modals/deleteModal'; // Modal para eliminar suscripción

const Subscriptions = () => {
  // Hook de React Query para obtener los datos de suscripciones
  const {
    isLoading,
    isError,
    data: subsctiptionList,
  } = useQuery<Subsciption[]>({
    queryKey: ['getSubscription'],
    queryFn: async () => getAllSubscription(),
    refetchOnWindowFocus: false, // Evitar recargar los datos al enfocar la ventana
  });

  // Estados locales para manejar la visibilidad de los modales y los mensajes de error
  const [showModalUpsert, setShowModalUpsert] = useState(false); // Para la visibilidad del modal Crear/Actualizar
  const [showModalDelete, setShowModalDelete] = useState(false); // Para la visibilidad del modal Eliminar
  const [showToast, setShowToast] = useState(false); // Para la visibilidad del Toast
  const [showError, setShowError] = useState('Ha ocurrido un error, comuniquese con el administrador.'); // Mensaje de error
  const [selectedSubscription, setSelectedSubscription] = useState(''); // Para almacenar el ID de la suscripción seleccionada

  // Memoización de los datos de las filas para optimizar las re-renderizaciones
  const rowData = useMemo(() => {
    return subsctiptionList?.map((subs) => {
      return {
        name: subs.name,
        amount: subs.amount,
        id: subs.id,
      };
    });
  }, [subsctiptionList]);

  // Definición de las columnas para la tabla
  const colDefs = useMemo(() => {
    return [
      { field: 'name', headerName: 'Nombre', minWidth: 350 },
      {
        field: 'amount',
        headerName: 'Monto',
        minWidth: 350,
        valueFormatter: (params: any) => {
          // Formateo en peso chileno (CLP)
          return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
          }).format(params.value);
        },
      },

      {
        headerName: '',
        cellRenderer: (props: ICellRendererParams<any, number>) => {
          return (
            <div className="flex justify-center items-center">
              {/* Botón para editar la suscripción */}
              <Button
                text={''}
                status={'info'}
                icon={<EditIcon />}
                onClick={() => {
                  setShowModalUpsert(true); // Mostrar el modal de Crear/Actualizar
                  setSelectedSubscription(props.data.id.toString()); // Establecer el ID de la suscripción seleccionada
                }}
              />
              {/* Botón para eliminar la suscripción */}
              <Button
                text={''}
                status={'error'}
                icon={<DeleteIcon />}
                onClick={() => {
                  setShowModalDelete(true); // Mostrar el modal de Eliminar
                  setSelectedSubscription(props.data.id.toString()); // Establecer el ID de la suscripción seleccionada
                }}
              />
            </div>
          );
        },
        minWidth: 300,
      },
    ];
  }, []);

  return (
    <section className="w-full p-5">
      <section className="w-full px-2 md:px-6 text-xl text-gray-800 leading-normal">
        <section className="drop-shadow-md bg-white box-content box-border">
          <Breadcrumb /> {/* Breadcrumb de navegación */}
          {/* Título y mensaje de error */}
          <span className="text-base md:text-sm text-green-500 font-bold">
            <h1 className="font-bold break-normal text-blue-500 pt-6 pb-2 text-3xl md:text-4xl pl-5">Suscripciones</h1>
          </span>
          {showToast || isError ? <Toast text={showError} type={'error'} /> : null} {/* Mostrar Toast de error */}
        </section>

        {/* Tabla de suscripciones con un botón para agregar una nueva suscripción */}
        <section className="drop-shadow-md bg-white box-content box-border min-h-32 px-2 md:px-14 py-10">
          <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1">
            <section className="flex justify-end pb-4">
              <div>
                <Button
                  text={'Crear Subscripción'}
                  status={'info'}
                  icon={<PlusIcon />}
                  onClick={() => {
                    setShowModalUpsert(true); // Mostrar el modal de Crear/Actualizar
                    setSelectedSubscription(''); // Limpiar el ID de la suscripción seleccionada
                  }}
                />
              </div>
            </section>
          </section>

          {/* Mostrar Skeleton mientras carga o la tabla de suscripciones */}
          <section className="min-h-full">
            {isLoading ? <SkeletonTable /> : <Table headers={colDefs} information={rowData} />}
          </section>
        </section>
      </section>

      {/* Modal para crear o actualizar suscripción */}
      {showModalUpsert ? (
        <CreateModalUser
          closeEvent={setShowModalUpsert}
          errorEvent={setShowToast}
          setErrorMessage={setShowError}
          id={selectedSubscription} // Pasar el ID de la suscripción seleccionada para actualizaciones
        />
      ) : null}

      {/* Modal para eliminar suscripción */}
      {showModalDelete ? <DeleteModalSubs id={selectedSubscription} closeEvent={setShowModalDelete} /> : null}
    </section>
  );
};

export default Subscriptions;
