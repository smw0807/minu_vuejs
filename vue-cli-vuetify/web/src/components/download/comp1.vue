<template>
  <v-card>
    <v-card-title>download 속성을 이용한 다운로드 기능</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <v-btn href="/file/test" download>프로젝트 내 파일 다운로드</v-btn>
        </v-col>
        <v-col cols="6">
          <a href="/file/test" download>test2</a>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>