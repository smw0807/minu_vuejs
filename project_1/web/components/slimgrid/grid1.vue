<template>
  <v-card>
    <v-card-title></v-card-title>
    <v-card-text>
      <div>
        <slim-grid :column-options="columnOptions" :data="rows"></slim-grid>
      </div>
    </v-card-text>
  </v-card>
    
</template>

<script>
export default { 
  data() {
    return {
      rows: [
        { id: 1, name: 1 , value: 'a' },
        { id: 2, name: 2 , value: 'a' },
        { id: 3, name: 3 , value: 'a' },
        { id: 4, name: 4 , value: 'a' },
        { id: 5, name: 5 , value: 'a' },
        { id: 6, name: 6 , value: 'a' },
      ],
      columns: [
        { id: 'name', field: 'name', name:'이름'},
        { id: 'value', field: 'value', name:'값'}
      ],
      columnOptions: {
        'name':{
          id: 'name',
          name: 'Name',
          headerInput: false,
          headerFilter: false,
          formatter(row, cell, value) {
            return value
          }
        },
        'value':{
          id:'value',
          name: 'Value',
          headerInput: false,
          headerFilter: false,
          formatter(row, cell, value) {
            return value
          }
        }
      },
    }
  }
}
</script>

<style>
.disabled {
  height: 95%;
  display: block;
  padding: 0px;
  white-space: nowrap;
  text-align: center;
  background-color: #8795A1;
  color: #ffffff;
}
</style>