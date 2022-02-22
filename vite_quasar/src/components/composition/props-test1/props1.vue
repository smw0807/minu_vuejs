<script>
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log('props1: ', props);
  }
}
// export default {
//   setup(props) {
//     const { title } = toRefs(props);
//     console.log(title);
//     const title = toRef(props, 'title');
//   }
// }
</script>

<template>
  <div class="row">
    <div class="col">
      <!-- {{title}} -->
    </div>
  </div>
</template>