<template>
  <v-layout column>
    <v-row align="center">
      <v-col cols="6">
        <v-file-input
          show-size
          label="File input"
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
      console.log('file_info : ', file);
      this.file = file;
    },
    async upload() {
      console.log('upload!');
      console.log(this.file);
      let formData = new FormData();
      formData.append('file', this.file);
      console.log(formData);
      try {
        const rs = await this.$axios.post('/api/v1/file/file_upload', formData, {type : 'file'});
        // const rs = await this.$axios.post('/api/v1/file/file_upload', formData, {headers: {'Content-Type': 'multipart/form-data'}});
        console.log(rs);
        // const rs = await this.$store.dispatch('file/uploadFile', {file: this.file});
      } catch (err) {
        console.error(err);
      }
    }
  }
}
</script>

<style>

</style>