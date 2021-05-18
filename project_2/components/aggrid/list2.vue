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
        ></ag-grid-vue>
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
      rowData: null,
    }
  },
  beforeMount() {
    this.gridOptions = {};
    this.columnDefs = [
      {
        headerName: 'Athlete',
        field: 'athlete',
        minWidth: 180,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
      },
      { field: 'age' },
      {
        field: 'country',
        minWidth: 150,
      },
      { field: 'year' },
      {
        field: 'date',
        minWidth: 150,
      },
      {
        field: 'sport',
        minWidth: 150,
      },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
    this.rowSelection = 'multiple';
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
  },
  methods: {
    onQuickFilterChanged() {
      this.gridApi.setQuickFilter(document.getElementById('quickFilter').value);
    },
    onGridReady(params) {
      const updateData = (data) => {
        this.rowData = data;
      };

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
}
</script>

<style>

</style>