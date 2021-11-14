<template>
  <v-layout column>
    <v-row align="center">
      <v-col cols="6">
        <v-file-input
          show-size
          label="파일 1개 등록하기"
          @change="file_info"
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
export default {
  data() {
    return {
      file: null
    }
  },
  methods: {
    file_info(file) {
      this.file = file;
    },
    async upload() {
      let formData = new FormData();
      formData.append('file', this.file);
      try {
        const rs = await this.$store.dispatch('file/uploadFile', formData);
        console.log(rs);
      } catch (err) {
        console.error(err);
      }
    }
  }
}
</script>

<style>

</style>