<script>
import { ref, toRef, toRefs } from 'vue';
export default {
  props: {
    title: String
  },
  setup(props) {
    //props 받는 3가지 방법...??
    // const { title } = ref(props); //undefined
    let { title } = toRefs(props); //정상
    // const title = toRef(props, 'title'); //value 값만 찍힘
    // const title = ref(props.title); //정상
    // const title = ref(props, 'title'); //object key : value 다 찍힘

    // const title = toRefs(props.title);
    //??? -> { "0": "T", "1": "i", "2": "t", "3": "l", "4": "e", "5": "!" }

    // const title = toRefs(props, 'title'); //object key : value 다 찍힘

    // console.log(title);
    title = 'This is ' + props.title;
    return {
      title
    }
  }
}
</script>

<template>
  <div class="row">
    <div class="col">
      {{title}}
    </div>
  </div>
</template>