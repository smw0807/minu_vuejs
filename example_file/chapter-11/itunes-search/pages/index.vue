<template>
  <div>
    <h1>iTunes 검색하기</h1>
    <br/>
    <form @submit.prevent="submit"> <!-- 입력할 때 submit 메소드를 호출, prevent는 form 자체기능인 제출하는걸 막는 용도? -->
      <input placeholder="아티스트 이름 입력" v-model="search" ref='search' autofocus   />
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
      submit(event) {
        this.$router.push(`results/${this.search}`);
      }
  }
}
</script>

<style>
* {
  text-align: center;
}

h1 {
  padding: 20px;
}
</style>
