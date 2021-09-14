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
        col="4"
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
      ></v-text-field>
    </v-card-title>

    <v-card-text>
      <v-data-table
        v-resize-column
        :headers="headers"
        :items="listData"
        hide-default-footer
        class="elevation-1"
        :search="search"
        >
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
   
  },
}
</script>

<style>
</style>
