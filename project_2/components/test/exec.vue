<template>
  <v-card>
    <v-card-title>NodeJs Express child_process exec Test.</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-responsive :aspect-ratio="16/8">
        <v-row align="center">
          <v-col cols="5">
            <v-text-field
              label="IP Address"
              v-model="ip"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn @click="search" color="info">
              <v-icon>mdi-magnify</v-icon> 검색
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div v-html="result"></div>
          </v-col>
        </v-row>
      </v-responsive>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      ip: '',
      result: '',
    }
  },
  methods:{
    async search() {
      console.log('search : ', this.ip);
      try {
        const params = {
          ip : this.ip
        };
        const rs = await this.$axios.post('/api/v1/express/exec', params);
        if (!rs.data.error) {
          this.result = String(rs.data.msg).replace(/(?:\r\n|\r|\n)/g,"</br>");
        }
        console.log('search : ', rs);
      } catch (err) {
        console.error('search err : ', err);
      }
    }
  }
}
/**
 * 한글 깨짐 문제가 있고, 
 * 결과 나오는 속도가 느려서 websocket을 사용해서
 * 한줄한줄 바로 화면에 그려줘야하는 방안도 생각해봐야 할듯 함...
 */
</script>

<style>

</style>