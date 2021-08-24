<template>
  <v-card outline>
    <v-card-title>popup Component</v-card-title>
    <v-card-text>
      window.popup으로 컴포넌트 파일 띄우기..
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  created() {
    console.log('created : ' , opener);
  },
  beforeDestroy() {
    alert("팝업에서 닫음!!");
    if(opener) {
    }
  },
}
</script>

<style>

</style>