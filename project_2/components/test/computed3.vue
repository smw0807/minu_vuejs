<template>
  <v-card>
    <v-card-title>computed get set 테스트</v-card-title>
    <v-card-text>
      <v-layout column>
        <v-row>
          <v-col cols="2">
            {{ count_1 }}
          </v-col>
          <v-col cols="2">
            <v-btn @click="btn1">btn1</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">
            {{ count }}
            <!-- {{ count_2 }} -->
          </v-col>
          <v-col cols="2">
            <v-btn @click="btn2">btn2</v-btn>
          </v-col>
        </v-row>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  computed: {
    count_1() {
      console.log('computed count_1');
      return this.$store.getters['test/computed/GET_COUNT_1'];
    },
    count_2: {
      get() {
        console.log('computed count_2 get');
        return this.$store.getters['test/computed/GET_COUNT_2'];
      },
      set(v) {
        console.log('computed count_2 set', v);
        this.count = v;
        /**
         * set을 쓸떄 해당 데이터를 변경하면 계속 반복 호출되면서 맛감
         * RangeError: Maximum call stack size exceeded
         * 이런 에러가 발생
         * 사용하려면 data() 값을 만들어서 해당 값을 수정해야하는 듯
         * 그럼 이걸 왜쓰지?
         */
      }
    }
  },
  methods: {
    btn1() {
      console.log('btn1');
      this.$store.commit('test/computed/SET_COUNT_1', this.count_1 + 1);

      // this.count_1 = this.count1 + 1;
      /**
       * count_1은 get, set으로 처리하지 않아서 this.$store.commit을 하지 않고 그냥 값을 수정하려고하면
       * property "count_1" was assigned to but it has no setter. found in
       * 이런 에러가 발생함
       */
    },
    btn2() {
      console.log('btn2');
      // this.$store.commit('test/computed/SET_COUNT_2', this.count_2 + 1);
      this.count_2 = this.count_2 + 1;
    }
  },
}
</script>

<style>

</style>