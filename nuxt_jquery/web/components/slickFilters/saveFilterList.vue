/** 작업자 : 송민우 */
<template>
  <v-dialog v-model="dialog"
   max-width="850"
   persistent 
   >
    <template v-slot:activator="{ on, attrs }">
      <v-btn 
        color="info white--text" 
        small
        v-bind="attrs"
        v-on="on"
        >
        <v-icon small>mdi-filter-plus-outline</v-icon> 검색조건 저장
      </v-btn>
    </template>

    <v-card raised outlined shaped z-index="100015">
      <v-card-title>
        <strong>검색조건 저장</strong>
      </v-card-title>
      <v-divider/>
      <v-card-text align="end" class="px-3 pb-2 mt-2">
        <!-- 검색조건 저장 등록 및 상세보기 컴포넌트 -->
        <detail ref="detail" @reload="getData" />
      </v-card-text>
      <v-card-text class="px-3 py-1">
        <confirm ref="cf"/>
        <v-data-table
          :headers="headers"
          :items="items"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
          @page-count="pageCount = $event"
          no-data-text="저장된 검색조건이 없습니다."
          height="600"
          :loading="loading"
          loading-text="데이터를 불러오는 중입니다."
          >
          <template v-slot:[`item.actions2`]="{ item }">
            <v-icon
              small
              class="mr-2 btn_action"
              @click="detail(item)"
              style="color:#1976d2;">
              mdi-magnify
            </v-icon>
            <v-icon
              small
              class="btn_action"
              @click="deleteItem(item._id)"
              style="color:#e23d3d;">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>

        <div class="text-center pt-1">
          <v-pagination
            v-model="page"
            :length="pageCount"
          ></v-pagination>
        </div>
      </v-card-text>
      <v-card-actions class="px-2 pt-0">
        <v-spacer></v-spacer>
        <v-btn class="ma-1"  outlined text @click="dialog = !dialog">
          <v-icon left>mdi-close</v-icon> 닫기
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import detail from './saveFilterDetail'
import confirm from '~/components/cmn/confirm'
export default {
  components:{
    detail, confirm,
  },
  data() {
    return {
      dialog: false,
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        { text: '검색조건 명칭', value: 'title', width: 150},
        { text: '검색조건 설명', value: 'desc', width: 200 },
        { text: '작성일', value: 'upd_dt', width: 150 },
        { text: '-', value: 'actions2', align: 'center', width: 80, sortable: false },
      ],
    }
  },
  watch: {
    dialog(v) {
      if (v) {
        this.getData();
      } else {
        this.selectRow = [];
      }
    }
  },
  computed: {
    loading() {
      return this.$store.getters['GET_LOADING_1'];
    },
    items() {
      return this.$store.getters['threat/saveFilter/GET_FILTER_LIST'];
    }
  },
  methods:{
    async getData() {
      try {
        let params = {
          user_id: 'admin'
        };
        if (this.$nuxt.$route.path.indexOf('monitoring') !== -1) {
          params.location = 'monitoring';
        } else {
          params.location = 'analysis';
        }
        const rs = await this.$store.dispatch('threat/saveFilter/filterList', params);
      } catch (err) {
        console.error(err);
      }
    },
    detail(v) {
      this.$store.commit('threat/saveFilter/SET_DETAIL', v);
      this.$refs.detail.show_detail();
    },
    async deleteItem(v) {
      const rs = await this.$refs.cf.open({
        type:'warning',
        title: '검색조건 삭제',
        text: '해당 검색조건을 삭제하시겠습니까?'
      })
      if (rs) {
        const params = {};
        params._id = v;
        try {
          const rt = await this.$store.dispatch('threat/saveFilter/delete', params);
          if (rt) {
            this.getData();
            this.$store.dispatch('updateAlert', {alert: true, type: 'success', title: '검색조건 삭제', text: '삭제 완료되었습니다.'});
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
  },
}
</script>

<style>

</style>