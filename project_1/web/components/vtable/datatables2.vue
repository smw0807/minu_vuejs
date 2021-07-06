<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
      ></v-text-field>
      <v-btn color="primary" @click="add">Add</v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="items"
        :page.sync="page"
        :item-per-page="itemsPerPage"
        hide-default-footer
        @page-count="pageCount = $event"
        :search="search"
        height="550"
        ref="table"
        >
        <!-- <template v-slot:[`item.data1`]="{ item }">
          <v-edit-dialog
            :return-value.sync="item.data1"
            lazy
           
          > {{item.data1}}
            <template v-slot:[`input`]>
              <v-text-field
                v-model="item.data1"
                label="Edit"
                single-line
                counter
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template> -->
        <template v-slot:[`item.actions`]="{ index }">
          <v-icon
            small
            class="mr-2 btn_action"
            @click="edit(index, $event)"
            style="color:#1976d2;">
            mdi-magnify
          </v-icon>
            <!-- @click="edit(item)" -->
          <v-icon
            small
            class="btn_action"
            @click="del(index)"
            style="color:#e23d3d;">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
      <div class="text-center">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        // { text: 'No', value: 'no' },
        { text: 'field A', value: 'data1' },
        { text: 'field B', value: 'data2' },
        { text: 'field C', value: 'data3' },
        { text: '-', value: 'actions' },
      ],
      items: [
        { 'data1' : 'aaa', 'data2': 'bbb', 'data3':'ccc'},
        { 'data1' : 'aaa', 'data2': 'bbb', 'data3':'ccc'},
        { 'data1' : 'aaa', 'data2': 'bbb', 'data3':'ccc'},
        { 'data1' : 'aaa', 'data2': 'bbb', 'data3':'ccc'},
        { 'data1' : 'aaa', 'data2': 'bbb', 'data3':'ccc'},
        { 'data1' : 'aaa', 'data2': 'bbb', 'data3':'ccc'},
      ]
    }
  },
  methods: {
    add() {
      console.log('add');
      const info = this.$refs.table;

    },
    edit(v, e) {
      console.log('edit', v, e);
      const info = this.$refs.table;
      console.log(info);
      // const test = document.getElementsByTagName('>td', v);
      console.log(test);
      
    },
    del(v) {
      console.log('del', v);

    }
  },
}
</script>

<style>

</style>