<template>
<!-- 작업자:임지연 -->
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
    </v-card-title>

    <v-card-title>  
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
        col = "4"
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
      ></v-text-field>
    </v-card-title>

    <v-card-text class="equipList">
      <v-data-table
        :headers="headers"
        :items="listData"
        hide-default-footer
        class="elevation-1"
        :search="search"
        height="650"
      >
      <template v-slot:[`item.is_use`]="{ item }">
        <input type="checkbox" v-model="item.is_use" @click="switch_isUse(item, $event)"/>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
          mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
      </template>
          </v-data-table>
      </v-card-text>    
  </v-card>
</template>

<script>

export default {
  props:["list"],
  data(){
    return{
      firstId : '', 
      eq_info : null,
      search: '',
      headers : [
     
      ]
    }
  },
  computed: {
    listData() { 
      console.log(this.list);
      return this.list;
    },
    eq_info_data(){
      return this.eq_info;
    },
  },
  methods:{
    switch_isUse(item, e){
      if (confirm('')) {
        const params = {
          _id : item._id,
          is_use : e.target.checked
        }
      } else {
        e.preventDefault();
      }
    },
    editItem(item){
      console.log('editItem : ', item);
    },
    deleteItem(item){
      console.log('deleteItem : ', item);
    }
  },
}
</script>

<style>
  .equipList .v-input__slot{
      width:24px;
  }
  input[type="checkbox"] {
    border-radius: 50%;
    cursor: pointer;
    height: 34px;
    transition: inherit;
    width: 20px;
    margin: 7px;
  }
</style>
