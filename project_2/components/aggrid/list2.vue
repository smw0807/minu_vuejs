<template>
  <v-card>
    <v-card-title>
    </v-card-title>
    <v-card-text>
      <ag-grid-vue
        style="width: 100%; height: 700px;"
        class="ag-theme-alpine"
        id="myGrid"
        :gridOptions="gridOptions"
        @grid-ready="onGridReady"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :suppressRowClickSelection="true"
        :rowSelection="rowSelection"
        :rowData="rowData"

        :infiniteInitialRowCount="infiniteInitialRowCount"
        :components="components"
        ></ag-grid-vue>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      totCount: 1000,
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      defaultColDef: null,
      rowSelection: null,
      rowData: null,

    }
  },
  beforeMount() {
    this.gridOptions = {};
    this.columnDefs = [
      {
        headerName: '',
        // field: 'athlete',
        maxWidth: 30,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      {
        headerName: '기관명',
        field: 'institutionName',
        cellRenderer: 'loadingRenderer',
      },
      {
        headerName: '출발지 IP',
        field: 'attackIp'
      },
      {
        headerName: '출발지 Port',
        field: 'attackPort'
      },
      {
        headerName: '목적지 IP',
        field: 'victimIp'
      },
      {
        headerName: '목적지 Port',
        field: 'victimPort'
      },
      {
        headerName: '탐지회수',
        field: 'detectionCount'
      }
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      resizable: true,
      sortable: true
    };
    this.rowSelection = 'multiple';

    this.infiniteInitialRowCount = 1000;
    this.components = {
      loadingRenderer: (params) => {
        if (params.value !== undefined) {
          if (this.totCount === (params.rowIndex + 1)) {
            this.totCount += 100;
          } else {
            return params.value;
          }
        } 
      },
    };
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
  },
  watch: {
    async totCount() {
      this.onGridReady(this.gridOptions);
    }
  },
  methods: {
    onQuickFilterChanged() {
      this.gridApi.setQuickFilter(document.getElementById('quickFilter').value);
    },
    async onGridReady(params) {
      console.log(params);
      const updateData = (data) => {
        this.rowData = data;
        // var dataSource = {
        //   getRows (params) {
        //     console.log(params);
        //   }
        // }
      };
      try {
        let param = {
          size: this.totCount
        }
        let rs = await this.$store.dispatch('threat/monitoring/initList', param);
        console.log(rs);
        updateData(rs.data);
      } catch (err) {
        console.log('onGridReady err : ', err);
      }
    },
  },
}
</script>

<style>

</style>