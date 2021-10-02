<template>
  <v-card>
    <v-card-title>ElasticSearch 데이터 csv 파일로 받기</v-card-title>
    <v-card-text>
      <v-spacer/>
      <v-btn @click="download">CSV 다운로드</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  methods:{
    download() {
      const params = {
        columns : {
          test_mk_dt : '생성일',
          name : '이름',
          age: '나이',
          test_ip : '아이피',
          test_port : '포트',
          is_use : '사용여부'
        }
      };

    }
  }
}
</script>

<style>

</style>