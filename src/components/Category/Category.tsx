import Table from '../../storybook/components/Table/Table';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from './services/category.service';
import PlusIcon from '../../storybook/icons/plus';
import Button from '../../storybook/components/Button/Button';
import Toast from '../../storybook/components/Toast/Toast';
import SkeletonTable from '../../storybook/components/Skeleton/SkeletonTable';
import { useMemo, useState } from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import CreateModalUser from './modals/upsertModal';
import EditIcon from '../../storybook/icons/edit';
import DeleteIcon from '../../storybook/icons/delete';
import DeleteModalUser from './modals/deleteModal';
import CategoryModel from './models/Category';

const Category = () => {
  // Hook para obtener datos de usuarios con React Query
  const { isLoading, isError, data } = useQuery<CategoryModel[]>({
    queryKey: ['getCategories'],
    queryFn: async () => getAllCategories(),
    refetchOnWindowFocus: false, // Evita recargar datos al reenfocar la ventana
  });

  // Estados locales para la visibilidad de modales y mensajes
  const [showModalUpsert, setShowModalUpsert] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showError, setShowError] = useState('Ha ocurrido un error, comuniquese con el administrador.');
  const [selectedUser, setSelectedUser] = useState('');

  // Mapea los datos de usuarios para la tabla
  const rowData = useMemo(() => {
    return data?.map((category) => {
      return {
        name: category.name,
        id: category.id,
      };
    });
  }, [data]);

  // Configuración de las columnas de la tabla
  const colDefs = useMemo(() => {
    return [
      { field: 'name', headerName: 'Nombre', minWidth: 150, flex: 1 },
      {
        headerName: '',
        cellRenderer: (props: ICellRendererParams<any, number>) => {
          return (
            <div className="flex justify-center items-center">
              {/* Botón para editar usuario */}
              <Button
                text={''}
                status={'info'}
                icon={<EditIcon />}
                onClick={() => {
                  setShowModalUpsert(true);
                  setSelectedUser(props.data.id.toString());
                }}
              />
              {/* Botón para eliminar usuario */}
              <Button
                text={''}
                status={'error'}
                icon={<DeleteIcon />}
                onClick={() => {
                  setShowModalDelete(true);
                  setSelectedUser(props.data.id.toString());
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
    <section className="w-full p-5 ">
      <section className="w-full px-2 md:px-6 text-xl text-gray-800 leading-normal ">
        <section className="drop-shadow-md bg-white box-content box-border">
          {/* Título y mensaje de error */}
          <span className="text-base md:text-sm text-green-500 font-bold">
            <h1 className="font-bold break-normal text-blue-500 pt-6 pb-2 text-3xl md:text-4xl pl-5">
              Categorias de Productos
            </h1>
          </span>
          {showToast || isError ? <Toast text={showError} type={'error'} /> : null}
        </section>

        {/* Tabla de usuarios con botón para agregar nuevo */}
        <section className="drop-shadow-md bg-white box-content box-border min-h-32 px-2 md:px-14 py-10">
          <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1">
            <section className="flex justify-end pb-4">
              <div>
                <Button
                  text={'Crear Usuario'}
                  status={'info'}
                  icon={<PlusIcon />}
                  onClick={() => {
                    setShowModalUpsert(true);
                    setSelectedUser('');
                  }}
                />
              </div>
            </section>
          </section>

          {/* Renderiza Skeleton mientras carga o la tabla de usuarios */}
          <section className="min-h-full">
            {isLoading ? <SkeletonTable /> : <Table headers={colDefs} information={rowData} />}
          </section>
        </section>
      </section>

      {/* Modal para crear o actualizar usuario */}
      {showModalUpsert ? (
        <CreateModalUser
          closeEvent={setShowModalUpsert}
          errorEvent={setShowToast}
          setErrorMessage={setShowError}
          id={selectedUser}
        />
      ) : null}

      {/* Modal para eliminar usuario */}
      {showModalDelete ? <DeleteModalUser id={selectedUser} closeEvent={setShowModalDelete} /> : null}
    </section>
  );
};

export default Category;
