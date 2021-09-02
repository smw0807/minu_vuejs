<template>
<div>
  <v-card :height="resize_height - 700">
    <v-card-title>computed 속성 테스트1</v-card-title>
    <v-card-text>
      <v-layout column>
        <v-row>
          <v-col cols="2">{{cnt}}</v-col>
          <v-col cols="2"><v-btn @click="up">UP</v-btn></v-col>
          <v-col>
            methods로 처리시 체크
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="2">{{up_cnt}}</v-col>
          <v-col cols="2"><v-btn @click="up2">UP</v-btn></v-col>
          <v-col>
            computed로 처리시 체크
          </v-col>
        </v-row>
      </v-layout>
    </v-card-text>
  </v-card>
  <c11/>
</div>
</template>

<script>
import { resize } from '@/components/mixin/resize'
import c11 from '@/components/test/computed1-1'
export default { 
  components:{
    c11,
  },
  mixins: [resize],
  created() {
    this.cnt2 = this.cn2 + 1;
  },
  data() {
    return {
      cnt: 0,
      cnt2: 0
    }
  },
  computed: {
    up_cnt() {
      return this.cnt2;
    }
  },
  methods: {
    up() {
      this.cnt = this.cnt + 1;
    },
    up2() {
      this.cnt2 = this.cnt2 + 1;
      this.cnt2 = this.cnt2 + 1;
    }
  }
}
</script>

<style>

</style>