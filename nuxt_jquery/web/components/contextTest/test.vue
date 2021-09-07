<template>
  <div>
    <v-card>
      <v-card-title>
        v-datatable 안에 vue-context-menu 정상처리되는지 확인
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="listData"
          hide-default-footer
          class="elevation-1"
          @contextmenu:row="context"
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
    <context-menu
      id="context-menu" ref="ctxMenu" 
      :closeOnClick="closeOnClick"
      :lazy="lazy"
      :style="$vuetify.theme.dark === true ? dark_css : light_css"
      >
      <li>menu1</li>
      <li>menu2</li>
      <li>menu3</li>
    </context-menu>
  </div>
</template>

<script>
export default {
  props:['list'],
  data() {
    return {
      closeOnClick: false, //context-menu 영역 클릭해도 안닫히게 해줌
      lazy: true, //셀렉트박스 change이벤트에 메뉴 안 닫히게 쓸 용도
      headers : [
        { value: 'is_use'},
        { text: 'Dessert (100g serving)', value: 'name' },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
        { text: '-', value:'actions', sortalbe: false}
      ],
      light_css: {
        border: '1px solid #999',
        background: '#fff'
      },
      dark_css:{
        border: '1px solid #999',
        background: '#000'
      }
    }
  },
  mounted() {
  },
  computed: {
    listData() { 
      return this.list;
    },
  },
  methods: {
    context(event, item) {
      event.preventDefault();
      this.$refs.ctxMenu.open(event, item);
    }
  }
}
</script>

<style>

</style>