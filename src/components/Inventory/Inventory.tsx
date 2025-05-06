import { useQuery } from '@tanstack/react-query';
import { getInventory } from './services/purchase.service';
import PlusIcon from '../../storybook/icons/plus';
import Button from '../../storybook/components/Button/Button';
import SkeletonTable from '../../storybook/components/Skeleton/SkeletonTable';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { formatNumber, formatTotal } from '../../utils/functions/formatNumbers';
import { InventoryModel } from './models/Inventory';

import Eye from '../../storybook/icons/eye';
import inventoryReport from '../../utils/reports/inventory';
import allInventoryReport from '../../utils/reports/allInventory';

import { AgGridReact } from 'ag-grid-react';
import { gridOptions } from '../../utils/configs/ag-grid';
import TextField from '@mui/material/TextField';
import Delete from '../../storybook/icons/delete';
import DeleteModalInventory from './modal/deleteModal';
import Update from '../../storybook/icons/update';
import EditIcon from '../../storybook/icons/edit';
import UpdateModalProduct from './modal/upsertModal';

const Inventory = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [filterText, setFilterText] = useState('');
  const [selectedInventory, setSelectedInventory] = useState('');
  const [selectedUpdateInventory, setSelectedUpdateInventory] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  // Hook para obtener datos de usuarios con React Query
  const { isLoading, data } = useQuery<InventoryModel[]>({
    queryKey: ['getInventory'],
    queryFn: async () => getInventory(),
    refetchOnWindowFocus: false, // Evita recargar datos al reenfocar la ventana
  });

  // Estados locales para la visibilidad de modales y mensajes

  const getBilling = (billingSelected: InventoryModel) => {
    if (!data || !Array.isArray(data)) {
      console.warn('No data available');
      return; // Evita ejecutar el código si `data` es undefined o no es un array.
    }

    const agrupedElement =
      data?.filter(
        (inv) =>
          inv.enterprise_rut === billingSelected.enterprise_rut && inv.purchase_date === billingSelected.purchase_date,
      ) ?? [];

    const pdfUrl = inventoryReport({ row: agrupedElement });
    window.open(pdfUrl); // Abre la vista previa en una nueva pestaña
  };

  const getAllBilling = () => {
    const pdfUrl = allInventoryReport({ row: data });
    window.open(pdfUrl); // Abre la vista previa en una nueva pestaña
  };

  // Mapea los datos de usuarios para la tabla
  const rowData = useMemo(() => {
    return data?.map((inventory) => {
      return {
        id: inventory.id,
        enterprise_name: inventory.enterprise_name,
        enterprise_rut: inventory.enterprise_rut,
        folio: inventory.folio,
        product: inventory.product,
        count: inventory.count,
        category: inventory.categoria.name,
        last_value: inventory.last_value,
        avg_value: inventory.avg_value,
        purchase_date: inventory.purchase_date,
        total: inventory.avg_value * inventory.count,
        categoryValues: inventory.categoria,
      };
    });
  }, [data]);

  // Configuración de las columnas de la tabla
  const colDefs = useMemo(() => {
    return [
      { field: 'product', headerName: 'Producto', minWidth: 150, flex: 1 },
      { field: 'category', headerName: 'Categoria', minWidth: 150, flex: 1 },
      {
        field: 'count',
        headerName: 'Cantidad',
        minWidth: 150,
        flex: 1,
        valueFormatter: (params: { value: number }) => formatNumber(params.value),
      },
      {
        field: 'last_value',
        headerName: 'Valor compra',
        minWidth: 150,
        flex: 1,
        valueFormatter: (params: { value: number }) => formatTotal(params.value),
      },
      {
        field: 'avg_value',
        headerName: 'Valor Promedio',
        minWidth: 150,
        flex: 1,
        valueFormatter: (params: { value: number }) => formatTotal(params.value),
      },

      {
        field: 'total',
        headerName: 'Total',
        minWidth: 150,
        flex: 1,
        valueFormatter: (params: { value: number }) => formatTotal(params.value),
      },

      {
        headerName: 'Acciones',
        flex: 1,
        cellRenderer: (props: ICellRendererParams<any, number>) => {
          return (
            <div className="flex justify-center items-center">
              {/* Botón para editar usuario */}
              <Button
                text={''}
                status={'info'}
                icon={<Eye />}
                onClick={() => {
                  getBilling(props.data);
                }}
              />

              <Button
                text={''}
                status={'error'}
                icon={<Delete />}
                onClick={() => {
                  setSelectedInventory(props.data.id);
                  setOpenModal(true);
                }}
              />

              <Button
                text={''}
                status={'warning'}
                icon={<EditIcon />}
                onClick={() => {
                  setSelectedUpdateInventory(props.data);
                  setOpenModalUpdate(true);
                }}
              />
            </div>
          );
        },
        minWidth: 200,
      },
    ];
  }, [data]);

  useEffect(() => {
    if (gridRef?.current) {
      gridRef?.current?.api?.setGridOption('quickFilterText', filterText);
    }
  }, [filterText]);

  return (
    <section className="w-full p-5 ">
      <section className="w-full px-2 md:px-6 text-xl text-gray-800 leading-normal ">
        <section className="drop-shadow-md bg-white box-content box-border">
          {/* Título y mensaje de error */}
          <span className="text-base md:text-sm text-green-500 font-bold">
            <h1 className="font-bold break-normal text-blue-500 pt-6 pb-2 text-3xl md:text-4xl pl-5">
              Inventario productos
            </h1>
          </span>
        </section>

        {/* Tabla de usuarios con botón para agregar nuevo */}
        <section className="drop-shadow-md bg-white box-content box-border min-h-32 px-2 md:px-14 py-10">
          <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 2xl:grid-cols-1">
            <section className="flex justify-between pb-4">
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>

                  <TextField
                    type={'search'}
                    label={'Buscar Coincidencias'}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Button
                  text={'Imprimir todas las facturas'}
                  status={'info'}
                  icon={<PlusIcon />}
                  onClick={() => {
                    getAllBilling();
                  }}
                />
              </div>
            </section>
          </section>

          {/* Renderiza Skeleton mientras carga o la tabla de usuarios */}
          <section className="min-h-full  overflow-x-auto overflow-y-auto max-h-[900px]">
            {isLoading ? (
              <SkeletonTable />
            ) : (
              <>
                <div className="relative overflow-x-auto overflow-y-auto">
                  <div
                    className="ag-theme-quartz" // applying the grid theme
                    style={{ height: '70vh' }} // the grid will fill the size of the parent container
                  >
                    <AgGridReact
                      ref={gridRef}
                      rowData={rowData}
                      columnDefs={colDefs}
                      pagination={true}
                      paginationAutoPageSize={true}
                      gridOptions={gridOptions}
                    />
                  </div>
                </div>
              </>
            )}
          </section>
        </section>
      </section>
      {openModal && <DeleteModalInventory id={selectedInventory} closeEvent={setOpenModal} />}
      {openModalUpdate && <UpdateModalProduct information={selectedUpdateInventory} closeEvent={setOpenModalUpdate} />}
    </section>
  );
};

export default Inventory;
