<template>
  <v-data-table
      :headers="headers"
      :items="desserts"
      :expanded="expanded"
      item-key="name"
      show-expand
      class="elevation-1"
      @click:row="clicked">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Expandable Table</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ headers }">
        <td :colspan="headers.length">Peek-a-boo!</td>
      </template>
    </v-data-table>
</template>

<script>
export default {
  data () {
    return {
      expanded: ['Donut'],
      singleExpand: false,
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        }
      ],
    }
  },
  methods: {
    clicked(value) {
      this.expanded.push(value)
    }
},
}
</script>

<style>

</style>