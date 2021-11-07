<template>
  <v-layout column>
    <v-row>
      <v-col cols="5">
        <v-card
            color="#952175"
          >
          <v-card-title
            class="text-h5"
          > 1 ~ 5000 Count Animation </v-card-title>

          <v-card-text class="text-center">
            <number
            ref="number"
            :from="numberFrom"
            :to="numberTo"
            :format="theFormat"
            animationPaused
            @complete="completed"
            easing="Power1.easeOut" 
            />
            <!-- :duration="duration" -->
            <!-- easing 변경 속도 제어 옵션 -->
            <!-- easing="Power4.easeOut" -->
             <!-- easing="Back.easeIn" -->
            
          </v-card-text>
          <v-card-actions>
            <v-btn
              class="ml-2 mt-3"
              fab
              icon
              height="40px"
              right
              width="40px"
              @click="$refs.number.play()"
            >
              <v-icon>mdi-play</v-icon>
            </v-btn>
            <v-btn
              class="ml-2 mt-3"
              fab
              icon
              height="40px"
              right
              width="40px"
              @click="$refs.number.pause()"
            >
              <v-icon>mdi-pause</v-icon>
            </v-btn>
            <!-- 리스타트는 있는데 초기화를 하는 방법은 없나봄... -->
            <!-- <v-btn
              class="ml-2 mt-3"
              fab
              icon
              height="40px"
              right
              width="40px"
              @click="numberFrom = 0"
            >
              <v-icon>mdi-refresh</v-icon>
            </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import Vue from 'vue';
import VueNumber from 'vue-number-animation';
Vue.use(VueNumber);
export default {
  data() {
    return {
      numberFrom : 0,
      numberTo : 5000,
      duration: 1000,//지속시간
    }
  },
  methods: {
    theFormat(num) {
      return String(num.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    completed() {
      console.log('애니메이션 완료시');
    }
  }
}
</script>

<style>

</style>