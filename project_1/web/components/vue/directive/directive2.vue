<template>
  <v-card outlined>
    <v-card-title>mixin으로 만든 resize 기능 directive로 만들어보기</v-card-title>
    <v-card-text>
      <v-card v-auto-height="500">
        <v-card-text>
          ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
        </v-card-text>
      </v-card>
    </v-card-text>
    <!-- <v-card-text>
      <v-card v-auto-height="200">
        <v-card-text>
          ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
        </v-card-text>
      </v-card>
    </v-card-text> -->
  </v-card>
</template>

<script>
export default {
  directives: {
    'auto-height': {
      bind(el, binding) {
        //처음 높이 셋팅
        let w_height = window.innerHeight;
        if (binding.expression) {
          w_height =  w_height - Number(binding.expression);
        }
        el.style.height = w_height + 'px';

        //resize로 높이 변경 이벤트 발생하는 곳
        window.addEventListener('resize', function (e) {
          let t_height = e.target.innerHeight;
          if (binding.expression) {
            t_height = t_height - Number(binding.expression);
          }
          el.style.height = t_height + 'px';
        });
      }
    }
  }
}
</script>

<style>

</style>