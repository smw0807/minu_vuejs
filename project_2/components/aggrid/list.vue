<template>
   <v-card>
    <v-card-title>
    </v-card-title>
    <v-card-text>
      <ag-grid-vue
        style="width: 100%; height: 500px;"
        class="ag-theme-alpine"
        id="myGrid"
        :gridOptions="gridOptions"
        @grid-ready="onGridReady"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :components="components"
        :rowBuffer="rowBuffer"
        :rowSelection="rowSelection"
        :rowModelType="rowModelType"
        :paginationPageSize="paginationPageSize"
        :cacheOverflowSize="cacheOverflowSize"
        :maxConcurrentDatasourceRequests="maxConcurrentDatasourceRequests"
        :infiniteInitialRowCount="infiniteInitialRowCount"
        :maxBlocksInCache="maxBlocksInCache"
        >
        <!-- :modules="modules" -->
    </ag-grid-vue>
    </v-card-text>
  </v-card>
</template>

<script>
// import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model'
// import '@ag-grid-community/core/dist/styles/ag-grid.css';
// import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
export default {
  data() {
    return {
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      defaultColDef: null,
      components: null,
      rowBuffer: null,
      rowSelection: null,
      rowModelType: null,
      paginationPageSize: null,
      cacheOverflowSize: null,
      maxConcurrentDatasourceRequests: null,
      infiniteInitialRowCount: null,
      maxBlocksInCache: null,
      // modules: [InfiniteRowModelModule]
    }
  },
  beforeMount() {
    this.gridOptions = {};
    this.columnDefs = [
      // {
      //   headerName: 'No.',
      //   maxWidth: 100,
      //   valueGetter: 'node.id',
      //   cellRenderer: 'loadingRenderer',
      // },
      // {
      //   field: 'athlete',
      //   minWidth: 150,
      // },
      // { field: 'age' },
      // {
      //   field: 'country',
      //   minWidth: 150,
      // },
      // { field: 'year' },
      // {
      //   field: 'date',
      //   minWidth: 150,
      // },
      // {
      //   field: 'sport',
      //   minWidth: 150,
      // },
      // { field: 'gold' },
      // { field: 'silver' },
      // { field: 'bronze' },
      // { field: 'total' },
      {
        headerName: '수집일시',
        field: 'date_time',
        maxWidth: 100,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        cellRenderer: 'loadingRenderer',
      },
      {
        headerName: '출발지IP',
        field: 'attack_ip',
        minWidth: 150,
      },
      {
        headerName: '출발지Port',
        field: 'attack_port',
        minWidth: 150,
      },
      {
        headerName: '목적지IP',
        field: 'victim_ip',
        minWidth: 150,
      },
      {
        headerName: '목적지Port',
        field: 'victim_port',
        minWidth: 150,
      }
    ];
    this.defaultColDef = {
      flex: 1,
      resizable: true,
      minWidth: 100,
    };
    this.components = {
      loadingRenderer: (params) => {
        console.log('??? :', params);
        if (params.value !== undefined) {
          return params.value;
        } else {
          return '<img src="/img/loading.gif">';
        }
      },
    };
    this.rowBuffer = 0;
    this.rowSelection = 'multiple';
    this.rowModelType = 'infinite';
    this.paginationPageSize = 100;
    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 1;
    this.infiniteInitialRowCount = 1000;
    this.maxBlocksInCache = 10;
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
  },
  methods: {
    async onGridReady(params) {
      console.log('test: ', params);
      const updateData = (data) => {
        console.log(data);
        var dataSource = {
          rowCount: null,
          getRows: function (params) {
            console.log(
              'asking for ' + params.startRow + ' to ' + params.endRow
            );
            setTimeout(function () {
              var rowsThisPage = data.slice(params.startRow, params.endRow);
              var lastRow = -1;
              if (data.length <= params.endRow) {
                lastRow = data.length;
              }
              params.successCallback(rowsThisPage, lastRow);
            }, 500);
          },
        };
        params.api.setDatasource(dataSource);
      };
      try {
        let rs = await this.$store.dispatch('threat/monitoring/initList', {size: params.endRow === undefined ? 100 : params.endRow});
        console.log(rs);
        updateData(rs.data);
      } catch (err) {
        console.log('onGridReady err : ', err);
      }
      // fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      //   .then((resp) => resp.json())
      //   .then((data) => updateData(data));
    },
  },
}
</script>

<style>

</style>