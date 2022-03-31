<script>
import { ref } from 'vue';
import childCom from './props-test1/props1.vue';
export default {
  components: {
    childCom
  },
  setup(props, context) {
    const count = ref(0);
    const title = ref('Title!');
    return {
      count,
      title,
      context
    }
  },
}
</script>

<template>
 <div>
  <div class="row">
    <div class="col-2">
      Basic Usage
    </div>
    <div class="col">
      <q-btn @click="count++" label="count++"/> {{count}}
    </div>
  </div>

  <q-separator inset class="q-my-md" />

  <div class="row">
    <div class="col-2">
      Accessing Props
    </div>
    <div class="col">
      <child-com :title="title"/>
    </div>

  </div>
  <q-separator inset class="q-my-md" />

  <div class="row">
    <div class="col-2">
      Setup Context
    </div>
    <div class="col">
      {{context}}
    </div>
  </div>

 </div>
</template>

<style scoped>
</style>