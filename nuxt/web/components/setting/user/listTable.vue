<template>
  <v-card raised outlined class="pa-3" min-height="700">
    <v-card-title>
      <v-spacer></v-spacer>
      <!-- <slot name="edit_button"></slot> -->
      <edit-user/>
    </v-card-title>
    <v-card-title>
      Vuetify DataTables
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="listData"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
        :search="search"
        height="500"
        >
        <template v-slot:item.actions="{ item }">
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
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import editUser from '~/components/setting/user/editUser'

export default {
  props:["list"],
  data() {
    return {
      search:'',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [ //props로 받아서 처리하게끔 변경해보기
        // {
        //   text: 'Dessert (100g serving)',
        //   align: 'start',
        //   sortable: false,
        //   value: 'name',
        // },
        { text: '아이디', value: 'user_id' },
        { text: '사용자명', value: 'user_nm' },
        { text: '권한', value: 'user_auth_nm' },
        { text: '설명', value: 'user_desc' },
        { text: '-', value: 'actions', sortalbe: false}
      ]
    }
  },
  computed: {
    listData() {
      return this.list;
    }
  },
  methods: {
    editItem(data) {
      console.log('editItem : ', data);
    },
    deleteItem(data) {
      console.log('deleteItem : ', data);
    }
  },
  components: { editUser }
}
</script>

<style>

</style>