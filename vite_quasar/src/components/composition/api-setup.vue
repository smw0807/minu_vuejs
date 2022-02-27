<script>
import { ref } from 'vue';
import p1 from './props-test1/props1.vue'
export default {
  setup() {
    const count = ref(0);
    const title = ref('Title!');
    return {
      count,
      title
    }
  },
  mounted() {
    console.log(this.count);
    // console.log('store : ', this.$store.getters['rootState']);
  },
  components: {
    p1
  }
}
</script>

<template>
 <div class="row">
   <div class="col">
     <q-btn @click="count++" label="count++"/> {{count}}
   </div>
   <div class="col">
     <p1 :title="title"/>
   </div>
 </div>
</template>

<style scoped>
</style>