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

const Inventory = () => {
  const gridRef = useRef<AgGridReact>(null);
  const [filterText, setFilterText] = useState('');
  // Hook para obtener datos de usuarios con React Query
  const { isLoading, data } = useQuery<InventoryModel[]>({
    queryKey: ['getInventory'],
    queryFn: async () => getInventory(),
    refetchOnWindowFocus: false, // Evita recargar datos al reenfocar la ventana
  });

  // Estados locales para la visibilidad de modales y mensajes

  const getBilling = (billingSelected: InventoryModel) => {
    const agrupedElement = data?.filter(
      (inv) =>
        inv.enterprise_rut === billingSelected.enterprise_rut && inv.purchase_date === billingSelected.purchase_date,
    );

    inventoryReport({ row: agrupedElement });
  };

  const getAllBilling = () => {
    allInventoryReport({ row: data });
  };

  // Mapea los datos de usuarios para la tabla
  const rowData = useMemo(() => {
    return data?.map((inventory) => {
      console.log(inventory);
      return {
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
        headerName: 'Ver Factura',
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
            </div>
          );
        },
        minWidth: 100,
      },
    ];
  }, []);

  useEffect(() => {
    console.log('llega aqui1 ', gridRef);
    console.log('llega aqui', filterText);
    gridRef?.current?.api.setGridOption('quickFilterText', filterText);
  }, [filterText]);

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
                  <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Buscar Coincidencias"
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
          <section className="min-h-full">
            {isLoading ? (
              <SkeletonTable />
            ) : (
              <>
                <div className="relative overflow-x-auto">
                  <div
                    className="ag-theme-quartz" // applying the grid theme
                    style={{ height: 700 }} // the grid will fill the size of the parent container
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
    </section>
  );
};

export default Inventory;
