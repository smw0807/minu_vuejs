<template>
   <v-card>
    <v-card-title>
    </v-card-title>
    <v-card-text>
      <ag-grid-vue
        tyle="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        id="myGrid"
        :gridOptions="gridOptions"
        @grid-ready="onGridReady"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowSelection="rowSelection"
        :rowModelType="rowModelType"
        :paginationPageSize="paginationPageSize"
        :cacheOverflowSize="cacheOverflowSize"
        :maxConcurrentDatasourceRequests="maxConcurrentDatasourceRequests"
        :infiniteInitialRowCount="infiniteInitialRowCount"
        :maxBlocksInCache="maxBlocksInCache"
        :getRowNodeId="getRowNodeId"
        :components="components"
        >
      </ag-grid-vue>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      defaultColDef: null,
      rowSelection: null,
      rowModelType: null,
      paginationPageSize: null,
      cacheOverflowSize: null,
      maxConcurrentDatasourceRequests: null,
      infiniteInitialRowCount: null,
      maxBlocksInCache: null,
      getRowNodeId: null,
      components: null,
      rowData: null
    }
  },
   beforeMount() {
    this.gridOptions = {};
    this.columnDefs = [
      {
        headerName: '수집시간',
        field: 'date_time',
      },
      { 
        headerName: '유형',
        field: 'type' 
      },
      {
        headerName: '탐지규칙명',
        field: 'rule_name',
      },
      { 
        headerName: '공격IP',
        field: 'attack_ip'
      },
      {
        headerName: '공격 PORT',
        field: 'attack_port',
      },
      {
        headerName: '피해IP',
        field: 'victim_ip',
      },
      { 
        headerName: '피해 PORT',
        field: 'victim_port'
      }
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      sortable: true,
      resizable: true,
      floatingFilter: true,
    };
    this.components = {
      loadingRenderer: (params) => {
        if (params.value !== undefined) {
          return params.value;
        } else {
          return '<img src="/img/loading.gif">';
        }
      },
    };
    this.rowSelection = 'multiple';
    this.rowModelType = 'infinite';
    this.paginationPageSize = 100;
    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 2;
    this.infiniteInitialRowCount = 1;
    this.maxBlocksInCache = 2;
    this.getRowNodeId = (item) => {
      return item.id;
    };
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
  },
  computed: {
    rowDatas() {
      return this.rowData;
    }
  },
  methods: {
    async onGridReady(params) {
      console.log('onGridReady!! ', params);
      const updateData = (data) => {
        // console.log(data);
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
        const rs = await this.$store.dispatch('threat/monitoring/initList');
        console.log('dd : ', rs);
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