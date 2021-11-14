<template>
  <v-layout column>
    <alert ref="alertCom"/>
    <v-row align="center">
      <v-col cols="6">
        <v-file-input
          show-size
          label="파일 1개 등록하기"
          v-model="file"
        ></v-file-input>
      </v-col>
      <v-col cols="6" align="end">
        <v-btn
          @click="upload"
        >
          <v-icon>mdi-upload</v-icon> 파일 등록
        </v-btn>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import alert from '@/components/custom/confirm'
export default {
  components: {
    alert
  },
  data() {
    return {
      file: null
    }
  },
  methods: {
    async upload() {
      if (this.file === null) {
        this.$store.dispatch('updateAlert', {
          alert:true,
          type: 'error',
          title: '파일 등록',
          text: '첨부할 파일을 선택해주세요'
        })
      } else {
        const cf = await this.$refs.alertCom.open({
          type: 'info',
          title: '파일 등록',
          text: `[${this.file.name}] 파일을 등록하시겠습니까?`
        });
        if (cf) {
          let formData = new FormData();
          formData.append('file', this.file);
          try {
            const rs = await this.$store.dispatch('file/uploadFile', formData);
            console.log(rs);
            if (rs) {
              this.file = null;
              await this.$store.dispatch('file/initList', {});
            }
          } catch (err) {
            console.error(err);
          }
        }
      }
    }
  }
}
</script>

<style>

</style>