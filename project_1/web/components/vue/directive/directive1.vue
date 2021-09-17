<template>
  <v-card outlined>
    <v-card-title>VueJS Driective 테스트</v-card-title>
    <v-card-text>
      <div v-local1></div>
      <v-layout column>
        <v-row>
          <v-col>
            <span v-text-highlight>디렉티브를 이용한 텍스트 하이라이트1</span>
          </v-col>
          <v-col>
            <span v-text-highlight.red>디렉티브를 이용한 텍스트 하이라이트2</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span v-text-highlight:color="'#FF0000'">디렉티브를 이용한 텍스트 하이라이트3</span>
          </v-col>
          <v-col>
            <span v-text-highlight:yellow>디렉티브를 이용한 텍스트 하이라이트4</span>
          </v-col>
        </v-row>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  directives:{
    local1(el, binding, vnode, oldVnode) {
      const test = vnode.context; //컴포넌트 인스턴스 접근 방법
      // console.log(test);
    },
    "text-highlight": {
      bind(el, binding) {
        console.log('text-highlight : ', binding);
        if (!binding.arg) {
          console.log('하이라이트 1번 2번 여기탐', binding.modifiers);

        }
        if (binding.arg && binding.arg === 'color') { //하이라이트 3번 방식
          el.style.backgroundColor = binding.value;
        }
        if (binding.arg && binding.arg !== 'color') { //하이라이트 4번 방식
          let color = 'none';
          switch(binding.arg) {
            case 'red': 
              color = '#FF0000';
              break;
            case 'blue':
              color = '#0054FF';
              break;
            case 'yellow':
              color = '#FAED7D';
              break;
            default:
              color = 'none';
              break;
          }
          el.style.backgroundColor = color;
        }
      }
    }
  }
}
</script>

<style>

</style>