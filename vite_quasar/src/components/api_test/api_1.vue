<script>
import { inject, reactive, onMounted  } from 'vue'
export default {
  setup() {
    const axios = inject('$axios');
    const state = reactive({
      title: 'API 테스트',
      content: ''
    })
    const sendAPI = async () => {
      try {
        const params = {
          dataA: 'aaa'
        }
        const rs = await axios.post('/api/test', params);
        console.log(rs);
        state.content = rs.data.msg;
      } catch (err) {
        console.error(err);
      }
    }
    onMounted(() => {
      sendAPI();
    })
    return {
      state, sendAPI
    }
  },
  // methods: {
  //   async sendAPI() {
  //     try {
  //       const rs = await this.axios.post('/api/test');
  //       this.state.content = rs.data.msg;
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  // }
}
// export default  {
//   setup() {
//     const state = reactive({
//       title: 'API 테스트',
//       content: ''
//     })
//     return {
//       state
//     }
//   },
//   methods: {
//     async sendAPI() {
//       try {
//         const rs = await this.axios.post('/api/test');
//         this.state.content = rs.data.msg;
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   }
// }
</script>

<template>
  <div class="row">
   <div class="col-12">
     <q-btn @click="sendAPI" label="API Test"/> 
   </div>
   <div class="col-12">
     결과 : {{state.content}}
   </div>
 </div>
</template>

<style>

</style>