
import axios from 'axios'

export default function ( {params, store} ) { //params와 store에 접근할 수 있는 기본 함수
  return axios.get(`https://itunes.apple.com/search?term=${params.id}&entity=album`)
        .then((response) => {
            store.commit('add', response.data.results)
            //  console.log(response.data.results);
        });
}
