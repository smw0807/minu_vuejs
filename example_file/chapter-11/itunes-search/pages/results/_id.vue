<template>
  <div>
    <h1>{{$route.params.id}}에 대한 결과</h1>
    <div v-if="albumData">
      <div v-for="(album, index) in albumData" :key="index">
          <Card :title="album.collectionCensoredName"
                :image="album.artworkUrl60"
                :artistName="album.artistName"
                :url="album.artistViewUrl"
                :color="picker(index)"/>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Card from '~/components/Card.vue'
export default {
    asyncData ({ params }) { //ES6의 비구조화를 사용해 params를 가져옴
      return axios.get(`https://itunes.apple.com/search?term=${params.id}&entity=album`)
        .then((response) => {
            console.log(response.data.results);
            return {albumData: response.data.results}
        });
    },
    components: {
      Card
    },
    methods: {
      picker(index) {
          return index % 2 == 0 ? 'red' : 'blue'
      }
    },
    computed: {
      /* albumData() { //앨범에 대한 저장소 속성을 반환하는 계산된 속성
        return this.$store.state.albums;
      } */
    },
    middleware: 'search' //여기서 실행할 미들웨어를 지정한다.
}
</script>
