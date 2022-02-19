<script>
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log('props1: ', props);
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