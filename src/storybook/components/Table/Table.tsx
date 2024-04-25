import * as React from 'react';
import { TableProps } from './interface';

import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the grid

const Table = ({ headers, information }: TableProps) => {
  const gridOptions = {
    rowHeight: 50,
    defaultColDef: {
      sortable: true,
      resizable: true,
      filter: true,
    },
    // note - we do not set 'virtualPaging' here, so the grid knows we are doing standard paging
    components: {
      rowNodeIdRenderer: function (params: any) {
        return params.node.id + 1;
      },
    },
    columnDefs: headers,
    sideBar: true,
    pagination: false,

    paginationPageSize: 500,
    enableRangeSelection: true,
    enableCharts: true,
    localeText: {
      // for filter panel
      page: 'Pagina',
      more: 'Mas',
      to: 'a',
      of: 'de',
      next: 'Siguente',
      last: 'Último',
      first: 'Primero',
      previous: 'Anteror',
      loadingOoo: 'Cargando...',
      PageSize: 'Mostrar',

      // for set filter
      selectAll: 'Seleccionar Todo',
      searchOoo: 'Buscar...',
      blanks: 'En blanco',

      // for number filter and text filter
      filterOoo: 'Filtrar',
      applyFilter: 'Aplicar Filtro...',
      equals: 'Igual',
      notEqual: 'No Igual',

      // for number filter
      lessThan: 'Menos que',
      greaterThan: 'Mayor que',
      lessThanOrEqual: 'Menos o igual que',
      greaterThanOrEqual: 'Mayor o igual que',
      inRange: 'En rango de',

      // for text filter
      contains: 'Contiene',
      notContains: 'No contiene',
      startsWith: 'Empieza con',
      endsWith: 'Termina con',

      // filter conditions
      andCondition: 'Y',
      orCondition: 'O',

      // the header of the default group column
      group: 'Grupo',

      // tool panel
      columns: 'Columnas',
      filters: 'Filtros',
      valueColumns: 'Valos de las Columnas',
      pivotMode: 'Modo Pivote',
      groups: 'Grupos',
      values: 'Valores',
      pivots: 'Pivotes',
      toolPanelButton: 'BotonDelPanelDeHerramientas',

      // other
      noRowsToShow: 'No hay filas para mostrar',

      // enterprise menu
      pinColumn: 'Columna Pin',
      valueAggregation: 'Agregar valor',
      autosizeThiscolumn: 'Autoajustar esta columna',
      autosizeAllColumns: 'Ajustar todas las columnas',
      groupBy: 'agrupar',
      ungroupBy: 'desagrupar',
      resetColumns: 'Reiniciar Columnas',
      expandAll: 'Expandir todo',
      collapseAll: 'Colapsar todo',
      toolPanel: 'Panel de Herramientas',
      export: 'Exportar',
      csvExport: 'Exportar a CSV',
      excelExport: 'Exportar a Excel (.xlsx)',
      excelXmlExport: 'Exportar a Excel (.xml)',

      // enterprise menu pinning
      pinLeft: 'Pin Izquierdo',
      pinRight: 'Pin Derecho',

      // enterprise menu aggregation and status bar
      sum: 'Suman',
      min: 'Minimo',
      max: 'Maximo',
      none: 'nada',
      count: 'contar',
      average: 'promedio',

      // standard menu
      copy: 'Copiar',
      copyWithHeaders: 'Copiar con cabeceras',
      paste: 'Pegar',
    },
  };

  return (
    <div className="relative overflow-x-auto">
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={information}
          columnDefs={headers}
          gridOptions={gridOptions}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
    </div>
  );
};

export default Table;
