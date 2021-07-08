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
                @click="edit(index, $event)"
                style="color:#1976d2;">
                mdi-magnify
              </v-icon>
              <v-icon
                small
                @click="del(index)"
                style="color:#e23d3d;">
                mdi-delete
              </v-icon>
            </td>
          </tr>
        </template>
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
import Vue from 'vue'
import VueWithCompiler from "vue/dist/vue.esm";
const check = {
  render(h) { 
    const div = `<div>
        <v-icon small @click="edit_save">mdi-check</v-icon>
        <v-icon small @click="edit_cancel">mdi-close</v-icon>
      </div>`
    return h(Vue.compile(div)); 
  }
}
const jsx_test = {
  render(h) {
    return (
      <div>
        <v-icon small>mdi-check</v-icon>
        <v-icon small>mdi-close</v-icon>
      </div>
    )
  },
}
const edit_com = {
  template: `<div>
        <v-icon small @click="edit_save">mdi-check</v-icon>
        <v-icon small @click="edit_cancel">mdi-close</v-icon>
      </div>`
}
export default {
  components:{
    'jsx' : jsx_test,
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
        { 'data1' : 'aaa1', 'data2': 'bbb1', 'data3':'ccc1'},
        { 'data1' : 'aaa2', 'data2': 'bbb2', 'data3':'ccc2'},
        { 'data1' : 'aaa3', 'data2': 'bbb3', 'data3':'ccc3'},
        { 'data1' : 'aaa4', 'data2': 'bbb4', 'data3':'ccc4'},
        { 'data1' : 'aaa5', 'data2': 'bbb5', 'data3':'ccc5'},
        { 'data1' : 'aaa6', 'data2': 'bbb6', 'data3':'ccc6'},
      ],
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
      icon.addEventListener('click', () => {
        console.log("?")
        this.add();
      })
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
      const change = `
        <tr>
          <td><v-text-field value="k1"></v-text-field></td>
          <td><v-text-field value="k2"></v-text-field></td>
          <td><v-text-field value="k3"></v-text-field></td>
          <td>
            <v-icon small @click="edit_save">mdi-check</v-icon>
            <v-icon small @click="edit_cancel">mdi-close</v-icon>
          </td>
        </tr>`;
      const test = document.getElementsByClassName('item_' + v);
      console.log(test);
      const el = test[0];
      console.log(el);
      console.log(el.cells[0]);
      console.log(el.cells[1]);
      console.log(el.cells[2]);
      console.log(el.cells[3]);

      console.log(el.childElementCount);
      // el.removeChild
      // el.remove(); //insert mode cancel

      
        // el.innerHTML = Vue.compile(t.template);
      el.innerHTML = change;
      // el.innerHTML = '<div>{{{change}}}</div>';
      // el.innerHTML = Vue.compile(change).render();
      // el.innerHTML = VueWithCompiler.compile(change).render();
      // VueWithCompiler.compile(el);
      
      // console.log(VueWithCompiler.compile(el).render);
      // const icon = document.createElement('i');
      // icon.className = "mdi mdi-cancel";
      // icon.addEventListener('click', () => {
      //   console.log("?")
      //   this.add();
      // })
      // const f1 = '<v-text-field></v-text-field>';
      // console.log(Vue.compile(f1).render);
      // console.log(Vue.compile(f1));
      // const btn =  `<div>
      //   <v-icon small @click="edit_save">mdi-check</v-icon>
      //   <v-icon small @click="edit_cancel">mdi-close</v-icon>
      // </div>`
      // const tt = VueWithCompiler.compile(edit_com).render;
      // el.cells[3].innerHTML = VueWithCompiler.compile(edit_com).render;
      // el.cells[3] = Vue.compile(btn).render;
    },
    draw(v) {
    },
    del(v) {
      console.log('del', v);

    },

    edit_save() {
      console.log('edit_save');
    },
    edit_cancel() {
      console.log('edit_cancel');
    }

  },
}
</script>

<style>

</style>