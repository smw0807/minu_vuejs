<template>
  <div>
    <button @click="test">test!</button> 
    <table-com :list="list" ></table-com> <!-- table1 컴포넌트의 list 속성에다가 list 데이터를 보냄 -->
  </div>
</template>

<script>
const test = [
  {"id":1,"name":"공조111111","year":2017,"director":"김성훈","poster":"http://img.cgv.co.kr/Movie/Thumbnail/Poster/000079/79416/79416_185.jpg"},
  {"id":2,"name":"컨택트22222","year":2017,"director":"드니 빌뇌브","poster":"http://img.cgv.co.kr/Movie/Thumbnail/Poster/000079/79437/79437_185.jpg"},
  {"id":3,"name":"더킹33333","year":2017,"director":"한재림","poster":"http://img.cgv.co.kr/Movie/Thumbnail/Poster/000079/79423/79423_185.jpg"},
]
import table1 from '../components/table1';
export default {
    // data () {
    //   return {
    //     list: []
    //   }
    // },
    components: {
      'table-com': table1
    },
    created() {
      this.$store.dispatch('board/board/initBoardList');
    },
    computed: {
      list() {
        return this.$store.getters['board/board/boardList'];
      }
    },
    methods: {
      test() {
        this.$store.commit('board/board/SET_BOARD_LIST', test);
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