<template>
  <div>
    <h1>board1</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>id</th>
          <th>Year</th>
          <th>Name</th>
          <th>Director</th>
          <th>poster</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in list" :key="data.id" @click="row(data.id)">
          <td>{{data.id}}</td>
          <td>{{data.year}}</td>
          <td>{{data.name}}</td>
          <td>{{data.director}}</td>
          <td><img :src="data.poster"></td>
        </tr>
      </tbody>
    </table>
    <button @click="test">test!</button>
  </div>
</template>

<script>
  const test = [
    {"id":1,"name":"공조111111","year":2017,"director":"김성훈","poster":"http://img.cgv.co.kr/Movie/Thumbnail/Poster/000079/79416/79416_185.jpg"},
    {"id":2,"name":"컨택트22222","year":2017,"director":"드니 빌뇌브","poster":"http://img.cgv.co.kr/Movie/Thumbnail/Poster/000079/79437/79437_185.jpg"},
    {"id":3,"name":"더킹33333","year":2017,"director":"한재림","poster":"http://img.cgv.co.kr/Movie/Thumbnail/Poster/000079/79423/79423_185.jpg"},
  ]
export default {
  created() {
    this.$store.dispatch('board/board/initBoardList'); //저장소 board안에 있는 actions을 트리거
  },
  computed: {
    list() {
      return this.$store.getters['board/board/boardList']; //board 저장소에 있는 state가 변하면 실행되고 그 변한 값을 가져옴
    }
  },
  methods: {
    test() { //테스트 버튼 클릭 이벤트
      this.$store.commit('board/board/SET_BOARD_LIST', test); //새로운 데이터를 mutation으로 보내서 state안에 있는 list 값을 바꿈
    },
    row(id) {
      console.log('row!!', id);
    }
  },
}
</script>

<style scope>
img {
  width: 100px;
  height: 100px;
}
th, td {
  text-align: center;
  vertical-align: middle !important; 
}
</style>