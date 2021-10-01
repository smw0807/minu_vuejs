<template>
  <v-container fluid>
    <v-layout>
      <v-row>
        <v-col cols="12">
          <comp1/>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
/**
 * axios와 proxy 테스트
 */
import comp1 from '@/components/axios_proxy/comp1'
export default { 
  components: {
    comp1,
  },
  data() {
    return {
      test : false
    }
  },
  created() {
    console.log('store : ', this.$store);
    if (this.test) {
      console.log('======== test3.vue created =======S');
      console.log('store : ', this.$store);
      console.log('state : ', this.$store.state.a);
      console.log('getter : ', this.$store.getters.GET_A);
      this.$store.commit('SET_A', 'bb');
      console.log('commit and getter : ', this.$store.getters.GET_A);
      console.log('subTest');
      console.log('state : ' , this.$store.state.test.test);
      
      /**
       * 이건 index.js가 아닌 subTest.js에 있는건데 같은 getters 함수에 들어있음.
       * 이름 중첩 조심해야할듯...?
       */
      console.log('getter : ', this.$store.getters.GET_TEST); 
      console.log('getter : ', this.$store.getters['GET_TEST']); //test/GET_TEST로는 왜 안되지...?
      this.$store.commit('SET_TEST', 'aaaaa');
      console.log('commit and getter : ', this.$store.getters['GET_TEST']);
      console.log('======== test3.vue created =======E');
    }
  },
}
</script>

<style>

</style>