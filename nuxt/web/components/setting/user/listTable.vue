<template>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <edit-user :user_info="user_info_data" @set_info="set_user_info"/>
    </v-card-title>
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
        :loading="loading"
        loading-text="데이터를 불러오는 중입니다."
        no-data-text="데이터가 없습니다."
        >
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
      user_info: null,
      search:'',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [ //props로 받아서 처리하게끔 변경해보기
        { text: '아이디', value: 'user_id' },
        { text: '사용자명', value: 'user_nm' },
        { text: '권한', value: 'user_auth_nm' },
        { text: '설명', value: 'user_desc' },
        { text: '-', value: 'actions', sortalbe: false}
      ]
    }
  },
  computed: {
    listData() { //리스트 불러오기
      return this.list;
    },
    user_info_data() { //상세정보
      return this.user_info;
    },
    loading() {
      return this.$store.getters['GET_LOADING_1'];
    }
  },
  methods: {
    editItem(data) {
      this.user_info = data;
    },
    async deleteItem(data) {
      if (confirm(`${data.user_id} 계정을 삭제하시겠습니까?`)) {
        const rs = await this.$store.dispatch('setting/user/deleteUser', data._id);
        if (rs.data.result.error == false) {
          this.$store.dispatch('setting/user/initUserList');
        } else {
          alert(rs.data.msg)
        }
      }
    },
    set_user_info(data) {
      this.user_info = data;
    }
  },
  components: { editUser }
}
</script>

<style>

</style>