<template>
  <v-layout column>
    <alert ref="alertCom"/>
    <v-form ref="form" lazy-validation>
      <v-row align="center">
        <v-col cols="10">
          <v-file-input
            show-size
            label="파일 1개 등록하기"
            v-model="file"
            :rules="file_rules"
          ></v-file-input>
        </v-col>
        <v-col cols="2">
          <v-btn
            @click="upload"
            >
            <v-icon>mdi-upload</v-icon> 파일 등록
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-form ref="form2" lazy-validation>
      <v-row align="center">
        <v-col cols="10">
          <v-file-input
            show-size
            counter
            small-chips
            multiple
            label="파일 여러개 등록 가능"
            v-model="files"
            :rules="files_rules"
          ></v-file-input>
        </v-col>
        <v-col cols="2">
          <v-btn
            @click="multi_upload"
            >
            <v-icon>mdi-upload</v-icon> 파일 등록
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
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
      file: null,
      file_rules: [
        v => !(v && v.size > 5000000) || '5MB 이상의 파일은 첨부할 수 없습니다.'
      ],
      files: null,
      files_rules: [
        v => !(v && v.length > 5) || '파일은 최대 5개까지만 등록할 수 있습니다.'
      ]
    }
  },
  methods: {
    async upload() { //단일 파일 업로드
      if (this.file === null) {
        this.$store.dispatch('updateAlert', {
          alert:true,
          type: 'error',
          title: '파일 등록',
          text: '첨부할 파일을 선택해주세요'
        })
      } else {
        const validate = this.$refs.form.validate();
        if (validate) {
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
    },
    async multi_upload() { //다중 파일 업로드
      if (this.files === null) {
        this.$store.dispatch('updateAlert', {
          alert:true,
          type: 'error',
          title: '파일 등록',
          text: '첨부할 파일을 선택해주세요'
        })
      } else {
        const validate = this.$refs.form2.validate();
        if (validate) {
          const cf = await this.$refs.alertCom.open({
            type: 'info',
            title: '파일 등록',
            text: `${this.files.length} 개의 파일을 등록하시겠습니까?`
          });
          if (cf) {
            let formData = new FormData();
            formData.append('files', this.files);
            for (let i in this.files) {
              formData.append('files', this.files[i]);
            }
            try {
              const rs = await this.$store.dispatch('file/uploadMultiFile', formData);
              if (rs) {
                this.files = null;
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
}
</script>

<style>

</style>