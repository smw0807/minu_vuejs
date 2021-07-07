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
    </v-card-title>
    <v-card-title>
      <v-btn color="primary" @click="add">Add</v-btn>
      <v-btn color="primary" class="ml-1" @click="add2">Add2</v-btn>
      <v-btn class="ml-1" @click="add3">Add3</v-btn>
      <v-btn class="ml-1" @click="jsx">JSX</v-btn>
      <v-btn small class="ml-1"><v-icon>mdi-cancel</v-icon></v-btn>
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
        <template v-slot:[`item`]="{ item, index}">
          <tr :class="'item_' + index">
            <td>{{ item.data1 }}</td>
            <td>{{ item.data2 }}</td>
            <td>{{ item.data3 }}</td>
            <td>
              <v-icon
                small
                class="mr-2 btn_action"
                @click="edit(index, $event)"
                style="color:#1976d2;">
                mdi-magnify
              </v-icon>
              <v-icon
                small
                class="btn_action"
                @click="del(index)"
                style="color:#e23d3d;">
                mdi-delete
              </v-icon>
            </td>
          </tr>
        </template>
        <!-- <template v-slot:[`item.actions`]="{ index }">
          <v-icon
            small
            class="mr-2 btn_action"
            @click="edit(index, $event)"
            style="color:#1976d2;">
            mdi-magnify
          </v-icon>
          <v-icon
            small
            class="btn_action"
            @click="del(index)"
            style="color:#e23d3d;">
            mdi-delete
          </v-icon>
        </template> -->
      </v-data-table>
      <div class="text-center">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
      <div id="test">
        <jsx/>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
const jsx_test = {
  render(h) {
    return (
      <div>
        <v-btn small class="ml-1"><v-icon>mdi-check</v-icon></v-btn>
        <v-btn small class="ml-1"><v-icon>mdi-close</v-icon></v-btn>
      </div>
    )
  },
}
export default {
  components:{
    'jsx' : jsx_test
  },
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
    add2() {
      const icon = document.createElement('i');
      icon.className = "mdi mdi-cancel";
      // icon.innerHTML = "folder_open";
      var main = document.getElementById('test');
      main.appendChild(icon);
    },
    add3() {
      const btn1 = document.createElement('button');
      btn1.className = 'v-btn v-btn--is-elevated v-btn--has-bg theme--dark v-size--default primary small';
      const icon = document.createElement('i');
      icon.className = "mdi mdi-chceck";
      btn1.innerHTML = '?';
      var main = document.getElementById('test');
      main.appendChild(btn1);
    },
    jsx() {
      console.log(jsx_test);
      // var main = document.getElementById('test');
      // main.appendChild(jsx_test);
    },
    edit(v, e) {
      console.log('edit', v, e);
      const test = document.getElementsByClassName('item_' + v);
      console.log(test);
      const el = test[0];
      console.log(el.cells[0]);
      console.log(el.cells[1]);
      console.log(el.cells[2]);
      console.log(el.cells[3]);
      el.cells[3].innerHTML = '<v-icon>mdi-check</v-icon>'
      /**
       * 2021-07-07
       * 여기서 문제,
       * 각 tr 태그 안에 innerHTML로 데이터를 넣으면 vuetify 컴포넌트 적용이 안된다.
       * 화면상에 실제 그려지는건 vuetify 태그가 아니기 때문에...
       * 위에 add3 함수 처럼 createElement를 이용해서 만들어야 할 것 같은데 
       * 조금만 더 하면 만들 수 있을 것 같다.
       */
    },
    del(v) {
      console.log('del', v);

    }
  },
}
</script>

<style>

</style>