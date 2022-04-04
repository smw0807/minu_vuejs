<template>
  <div>
    <vue-drag-resize :isActive="true" :w="200" :h="200" v-on:resizing="resize" v-on:dragging="resize">
      <h3>Hello World!</h3>
      <p>{{ stat.top }} х {{ stat.left }} </p>
      <p>{{ stat.width }} х {{ stat.height }}</p>
    </vue-drag-resize>
  </div>
</template>

<script>
import { reactive } from 'vue';
import VueDragResize from 'vue-drag-resize';
export default {
  components: {
    VueDragResize
  },
  setup() {
    const stat = reactive({
      width : 200,
      height : 200,
      top : 0,
      left : 0,
    })

    const resize = (newRect) => {
      stat.width = newRect.width;
      stat.height = newRect.height;
      stat.top = newRect.top;
      stat.left = newRect.left;
    }

    return {
      stat,
      resize
    }
  }
}
</script>

<style>

</style>