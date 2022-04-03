<script>
import { ref } from 'vue';
import childCom from './props-test1/props1.vue';
import provideInject from './provide-inject/MyMap.vue';
import tplRefs from './template-refs/tpl-refs.vue';
import tplVFor from './template-refs/tpl-v-for.vue';

export default {
  components: {
    childCom,
    provideInject,
    tplRefs,
    tplVFor,
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

  <q-separator inset class="q-my-md" />

  <div class="row">
    <div class="col-2">
      Provide/Inject
    </div>
    <div class="col">
      <provide-inject/>
    </div>
  </div>

  <q-separator inset class="q-my-md" />

  <div class="row">
    <div class="col-2">
      템플릿 Refs
    </div>
    <div class="col-10">
      <tplRefs/>
    </div>
    <div class="col-2 q-mt-sm">v-for</div>
    <div class="col-10 q-mt-sm">
      <tpl-v-for/>
    </div>
  </div>

  <q-separator inset class="q-my-md" />

  <div class="row">
    <div class="col-2">
      JSX
    </div>
    <div class="col">
    </div>
  </div>

 </div>
</template>

<style scoped>
</style>