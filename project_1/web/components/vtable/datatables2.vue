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
        <!-- v-show? v-if?  그리고 어떤 방식으로 둘다 그리고 스위칭할 수 있을까? -->
        <template v-slot:[`item`]="{ item, index}">
          <!-- <tr :class="['item_' + index,  index % 2 === 0 ? 'style-1' : 'style-2']"> -->
          <tr :class="'item_' + index">
            <td>{{ item.data1 }}</td>
            <td>{{ item.data2 }}</td>
            <td>{{ item.data3 }}</td>
            <td>
              <v-icon
                small
                @click="edit(index, item)"
                style="color:#1976d2;">
                mdi-magnify
              </v-icon>
              <v-icon
                small
                @click="del(index, item)"
                style="color:#e23d3d;">
                mdi-delete
              </v-icon>
            </td>
          </tr>
          <!-- <tr :class="['item_edit_' + index,  index % 2 === 0 ? 'style-1' : 'style-2']" style="display:none;"> -->
            <tr :class="'item_edit_' + index" style="display:none;" :ref="'item_edit_' + index" lazy-validation>
              <td><v-text-field value="k1" v-model="edit_field_1" :ref="'text1_'+index" dense :rules="check" clearable clear-icon="mdi-close-circle-outline"></v-text-field></td>
              <td><v-text-field value="k2" v-model="edit_field_2" :ref="'text2_'+index" dense :rules="check" clearable clear-icon="mdi-close-circle-outline"></v-text-field></td>
              <td><v-text-field value="k3" v-model="edit_field_3" :ref="'text3_'+index" dense :rules="check" clearable clear-icon="mdi-close-circle-outline"></v-text-field></td>
              <td>
                <v-icon small @click="edit_save(index)">mdi-check</v-icon>
                <v-icon small @click="edit_cancel(index)">mdi-close</v-icon>
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
export default {
  components:{
    'jsx' : jsx_test,
  },
  data() {
    return {
      noe_edit: false,
      edit_field_1: '',
      edit_field_2: '',
      edit_field_3: '',
      search: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
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

      check: [
        v => !!v || '값을 입력해주세요'
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
    edit (i, v) { //해당 tr 안에 데이터 수정
      if (this.now_edit) {
        this.$store.dispatch('updateAlert', {
          alert: true,
          type: 'warning',
          title: '알림',
          text: '이미 다른 작업이 있습니다.' 
        })
      } else {
        this.now_edit = true;
        this.edit_field_1 = v.data1;
        this.edit_field_2 = v.data2;
        this.edit_field_3 = v.data3;
        const row = document.getElementsByClassName('item_' + i);
        const el_row = row[0];
        el_row.style.display = 'none'
        const edit = document.getElementsByClassName('item_edit_' + i);
        const el_edit = edit[0];
        el_edit.style.display ='table-row';
  
        console.log(el_row);
        console.log(el_edit);
      }
    },
    del(i, v) { //해당 tr 데이터 삭제
      console.log('del', v);
    },

    edit_save(i) { //수정 저장
      console.log('edit_save', i);
      const test = this.$refs['item_edit_' + i];
      console.log(test);
      //validation check
      const text1 = this.$refs['text1_' + i].validate();
      const text2 = this.$refs['text2_' + i].validate();
      const text3 = this.$refs['text3_' + i].validate();
      console.log(text1);
      console.log(text2);
      console.log(text3);
      //data update

      //tale reload
    },
    edit_cancel(i) { //수정 취소
      this.now_edit = false;
      const row = document.getElementsByClassName('item_' + i);
      const el_row = row[0];
      el_row.style.display = 'table-row';
      const edit = document.getElementsByClassName('item_edit_' + i);
      const el_edit = edit[0];
      el_edit.style.display ='none';
    },
    
    edit_back(v, e) { //다른 방법을 찾아서 필요 없지만 나중에 다른 곳에서 필요한 상황이 생길 수도 있을 것 같아서 남겨둠
      console.log('edit', v, e);
      const change = `
      <v-form ref="form" lazy-validation>
        <tr>
          <td><v-text-field value="k1" v-model="edit_field_1"></v-text-field></td>
          <td><v-text-field value="k2" v-model="edit_field_2"></v-text-field></td>
          <td><v-text-field value="k3" v-model="edit_field_3"></v-text-field></td>
          <td>
            <v-icon small @click="edit_save">mdi-check</v-icon>
            <v-icon small @click="edit_cancel">mdi-close</v-icon>
          </td>
        </tr>
      </v-from>`;

      const test = document.getElementsByClassName('item_' + v);
      console.log(test);
      const el = test[0];
      console.log(el);
      // el.removeChild
      // el.remove(); //insert mode cancel
      
      // el.innerHTML = Vue.compile(t.template);
      el.innerHTML = change;
      // el.innerHTML = '<div>{{{change}}}</div>';
      // el.innerHTML = Vue.compile(change).render();
      
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
      // el.cells[3] = Vue.compile(btn).render;
    },
  },
}
</script>

<style>
.style-1 {
  background-color: rgb(76, 147, 214)
}
.style-2 {
  background-color: rgb(202, 103, 50)
}
</style>