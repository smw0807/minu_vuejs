<template>
  <v-card>
    <v-card-title>ElasticSearch 데이터 csv 파일로 받기</v-card-title>
    <v-card-text>
      <csv-download 
        :data="list" 
        :fields="csvFields" 
        :labels="csvHeaders">
        <v-btn>vue-json-csv를 이용한 csv 파일 생성</v-btn>
        <!-- list 안에 들어있는 데이터들로 csv 파일을 생성 -->
      </csv-download>
    </v-card-text>
    <v-card-text>
      <v-btn @click="download">node에서 csv 파일 생성</v-btn>
    </v-card-text>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="list"
        :page.sync="page"
        :item-per-page="itemsPerPage"
        hide-default-footer
        @page-count="pageCount = $event"
        :search="search"
        height="550"
        no-data-text="데이터가 없습니다."
      ></v-data-table>
      <div class="text-center">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      csvFields: [ //csv 파일에 입력시킬 필드
        'test_mk_dt',
        'name',
        'age',
        'test_ip',
        'test_port',
        'is_use',
      ],
      csvHeaders:{ //헤더 컬럼 필드 한글 매핑
        test_mk_dt : '생성일',
        name : '이름',
        age : '나이',
        test_ip : '아이피',
        test_port : '포트',
        is_use : '사용여부'
      },
      headers: [
        { text: '생성일', value: 'test_mk_dt' },
        { text: '이름', value: 'name' },
        { text: '나이', value: 'age' },
        { text: '아이피', value: 'test_ip' },
        { text: '포트', value: 'test_port' },
        { text: '사용여부', value: 'is_use' }
      ],
    }
  },
  created() {
    const params = {
      test:''
    }
    this.$store.dispatch('csv/initList', params);
  },
  computed: {
    list() {
      return this.$store.getters['csv/GET_LIST'];
    }
  },
  methods:{
    async download() {
      const params = {
        field: this.csvFields,
        mapping: this.csvHeaders
      }
      const rs = await this.$store.dispatch('csv/csvDownload', params);
      // window.open(rs);
    },
  }
}
</script>

<style>

</style>