<template>
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
        >
        <template v-slot:[`item.is_use`]="{ item }">
          <!-- <input type="checkbox" v-model="item.is_use" @click="is_checkbox(item, $event)"/> -->
          <v-checkbox v-model="item.is_use" @click.native.prevent.capture="is_checkbox(item, $event)"/>
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
      search: '',
      headers : [
        { value: 'is_use'},
        { text: 'Dessert (100g serving)', value: 'name' },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
        { text: '-', value:'actions', sortalbe: false}
      ]
    }
  },
  computed: {
    listData() { 
      return this.list;
    },
  },
  methods:{
    is_checkbox(item, e){
      if (confirm('해제하시겠습니까?')) {
        const params = {
          _id : item._id,
          is_use : e.target.checked
        }
        console.log('data : ', params);
      } else {
        e.stopPropagation();
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
  input[type="checkbox"] {
    border-radius: 50%;
    cursor: pointer;
    height: 34px;
    transition: inherit;
    width: 20px;
    margin: 7px;
  }
</style>
