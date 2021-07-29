

<template>
<!-- 작업자:임지연 -->
  <div>
    <v-card height=50>
      <edit-user 
        :user_info="user_info_data" 
        @set_info="set_user_info" 
        style="margin-right:15px; transform:translateY(24px);"/>
    </v-card>

    <div height=75 style="display:flex; justify-content:space-between; transform:translateY(15px);">
      <v-card-title style="width:500px; display:block;">  
        <v-text-field
          v-model="search"
          col = "4"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          style="padding-top:5px; "
        ></v-text-field>
      </v-card-title>

      <v-card-title class="adjust_table" style="transform:translateY(3px); padding: 6px 16px 0 0; ">
        <div>
          <v-card-text> total : {{this.list.length}} </v-card-text>
        </div>
        <div>
          <v-select
            :menu-props="{bottom: true, offsetY: true}"
            offsetY
            v-model="selectPerPage"
            :items="selectList"
            @change="adjustHeight_rest()"
            item-text="name"
            item-value="value"
            solo dense
            style="transform:translateY(12px); width:150px;  "
          ></v-select>
        </div>
        <div style="display: flex; background-color:rgba(238, 238, 238, 0.5); padding: 1px 10px 5px 10px; margin-left:20px; border-radius:4px; ">
          <div @click=adjustHeight(1,$event) class="btn_height">
            <v-icon style="transform:translateX(-1px); color:#1976d2; margin-right:2px;">mdi-view-agenda</v-icon>
          </div>
          <div @click=adjustHeight(2,$event) class="btn_height">
            <v-icon style="font-size:29px;">mdi-view-sequential</v-icon>
          </div>
          <div @click=adjustHeight(3,$event) class="btn_height">
            <v-icon style="font-size:29px;">mdi-view-headline</v-icon>
          </div>
        </div>
      </v-card-title>


    </div>

    <v-card-text class="userList">
      <v-data-table
        :headers="headers"
        :items="listData"
        :page.sync="page"
        :search="search"
        :items-per-page="selectPerPage"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
      >
        <template v-slot:[`item.is_use`]="{ item }">
          <v-checkbox 
            v-model="item.is_use" 
            @click.native.prevent.capture="switch_isUse(item,$event)">
          </v-checkbox>
        </template>

        <template v-slot:[`item.user_auth_nm`]="{ item }">
            <v-icon 
              left 
              style="font-size:15px;" 
              :color="divideUser(item.user_auth_nm)">
              mdi-account
            </v-icon>
            {{item.user_auth_nm}}
        </template>

        <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2 btn_action"
          @click="editItem(item)"
          style="color:#1976d2;">
          mdi-pencil
        </v-icon>
        <v-icon
          small
          class="btn_action"
          @click="deleteItem(item)"
          style="color:#e23d3d;">
          mdi-delete
        </v-icon>
        </template>
      </v-data-table>
      
      <div class="text-center pt-2">
        <v-pagination 
          v-model="page" 
          :length="pageCount">
        </v-pagination>
      </div>
    </v-card-text>    
  </div>
</template>
<script>
import editUser from './editUser'

export default {
  data() {
    return {
      user_info: null,
      search:'',
      page: 1,
      pageCount: 0,

      totalCount: null, 

      headers: [
        { text: '사용여부', value: 'is_use' },
        { text: '아이디', value: 'user_id' },
        { text: '사용자명', value: 'user_nm' },
        { text: '권한', value: 'user_auth_nm' },
        { text: '설명', value: 'user_desc' },
        { text: '수정 / 삭제', value: 'actions', sortable: false}
      ],
      selectList : [
        { name: '5개씩 보기', value: 5},
        { name: '10개씩 보기', value: 10},
        { name: '20개씩 보기', value: 20},
        { name: '30개씩 보기', value: 30},
      ],
      selectPerPage : 10,
      col_height:1,
      listData: [
        {"_index":"ni_setting","_id":"smw004","type":"user","user_id":"smw004","user_nm":"smw2","user_pw":"$2a$05$HJ927xw/svfMMd7NkVT5xewOA6.s4KC2g5pZnJmFF.Z8DuGIy8vTq","user_auth_nm":"일반 사용자","user_auth_code":"M","user_mk_dt":"2021-07-26 11:28:48","user_upd_dt":"2021-07-26 11:28:48","user_desc":"123123","is_use":true},
        {"_index":"ni_setting","_id":"smw0807","type":"user","user_id":"smw0807","user_nm":"송민우","user_pw":"$2a$05$K5AvmDK41oC.X/RTeRZ5T.DIx3l6WTeBaMEhg9b9AgE4zeXZsCqGS","user_auth_nm":"관리자","user_auth_code":"A","user_mk_dt":"2021-07-26 10:39:56","user_upd_dt":"2021-07-26 10:39:56","user_desc":"송민우 테스트 계정","is_use":true}
      ]
    }
  },
  created(){
  },
  computed: {
    user_info_data() { //상세정보
      return this.user_info;
    },
    changeSelect(){
      // selectBox 값을 가져와서 adjustHeight한번더 ...
      return this.selectPerPage;
    }
  },
  methods: {
    async switch_isUse(item, e){
      if (confirm(`${item.user_id}의 사용여부를 변경하시겠습니까?`)) {
        //....
      } else {
          e.stopPropagation();
          e.preventDefault();
      }
    },
    editItem(data) {
      this.user_info = data;
    },
    set_user_info(data){
      this.user_info = data;
    },
    async deleteItem(item) {
      // 코드 정리 
      if (confirm(`${item.user_id} 계정을 삭제하시겠습니까?`)) {
        //...
      }
    },
    divideUser(auth_nm){
      if(auth_nm == '관리자') return 'orange darken-4';
      else return 'success darken-4';
    },
    adjustHeight(whichHeight, e){
      // 코드정리
      let btn_height = document.getElementsByClassName('btn_height')
      for(let each_btn of btn_height){
        each_btn.children[0].style.color = 'rgba(0, 0, 0, 0.54)';
      }
      e.target.style.color = '#1976d2';
      let checkboxes = [];
      checkboxes = document.querySelectorAll('.userList .v-input');
      if(whichHeight == 1){
        this.col_height = 1;
        for(let each_cb of checkboxes){
          each_cb.style.margin = '16px 0';
        }
      }else if(whichHeight == 2){
        this.col_height = 2;
        for(let each_cb of checkboxes){
          each_cb.style.margin = '10px 0';
        }
      }else{
        this.col_height = 3;
        for(let each_cb of checkboxes){
          each_cb.style.margin = '4px 0 ' ;
        }
      }
    },
    async adjustHeight_rest(e){
      let ch = await this.col_height;

      let checkboxes = [];
      checkboxes =  document.querySelectorAll('.userList .v-input');
      if(ch == 1){
        for(let each_cb of checkboxes){
          each_cb.style.margin = '16px 0';
        }
      }else if(ch == 2){
        for(let each_cb of checkboxes){
          each_cb.style.margin = '10px 0';
        }
      }else{

        for(let each_cb of checkboxes){
          each_cb.style.margin = '4px 0 ' ;
        }
      }
    },
  },
  components: { editUser }
}
</script>
<style>
  .adjust_table{
    transform:translateX(-20px);
  }
  .userList .v-data-table{
    box-shadow:none !important;
  }
  .userList .v-input{
  }
  .userList .v-input__slot{
    width:24px;
    margin-bottom: 0 ;
  }
  .userList .v-input--selection-controls{

  }
  .userList .v-data-table-header{
    background-color: rgb(255 166 63 / 4%);
    color: black;
    border-top: solid 1px #e0e0e0;
    border-bottom: solid #e0e0e0 3px;
  }
  .userList .v-data-table-header th span{
  }
  .userList tr:nth-child(even){
    background-color: rgb(255 166 63 / 4%);
    /* background-color:#fcfcfc; */
  }
  .userList .v-input{
    margin:16px 0; 
  }
  .userList .v-messages{
    display:none;
  }
  .userList td{
    height:20px !important;
  }
  .btn_action{
    /* border-radius:100%; color: white; font-size: 16px; opacity:70%; padding:5px !important;  */
    padding:5px; 
    opacity:70%;
  }
  .btn_action:hover{
    opacity:100%;
    background-color:lightgray;
    padding: 5px; 
    border-radius:100%;
    transform:scale(1.3);
  }
  .btn_height i:hover{
    color: #1975d2;
    cursor:pointer;
  }


</style>