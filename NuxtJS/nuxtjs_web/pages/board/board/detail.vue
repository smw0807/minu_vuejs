<template>
  <div>
    <h1>상세 화면</h1>
    {{ id }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id
    }
  },
  created() {
    console.log(this.$nuxt.$route);
  },
}
</script>

<style>

</style>