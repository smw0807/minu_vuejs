<template>
  <v-card :height="resize_height - 700">
    <v-card-title>computed 속성 테스트2</v-card-title>
    <v-card-text>
      <v-layout column>
        <v-row>
          <v-col cols="2">{{up_cnt}}</v-col>
          <v-col cols="2"><v-btn @click="up">UP</v-btn></v-col>
          <v-col>
            computed로 처리시 체크
          </v-col>
        </v-row>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import { resize } from '@/components/mixin/resize'
export default { 
  mixins: [resize],
  data() {
    return {
      cnt: 0
    }
  },
  computed: {
    up_cnt: {
      get() {
        return this.cnt;
      },
      set() {
        this.cnt = this.cnt + 1;
      }
    }
  },
  methods: {
    up() {
      this.cnt = this.cnt + 1;
    }
  }
}
</script>

<style>

</style>