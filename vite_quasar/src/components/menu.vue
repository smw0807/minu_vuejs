<template>
  <!-- <q-drawer
    v-model="drawer"
    show-if-above
    :width="200"
    :breakpoint="500"
    bordered
    class="bg-grey-3"
    >
    <q-scroll-area class="fit">
      <q-list>

        <template v-for="(menuItem, index) in menuList" :key="index">
          <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
          <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
        </template>

      </q-list>
    </q-scroll-area>
  </q-drawer> -->
  <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="desktop" bordered>
    <q-btn to="/" class="full-width" label="index"/>
    <q-btn to="/composition" class="full-width" label="composition API"/>
    <q-btn to="/use-store" class="full-width" label="compositionAPI Store"/>
    <q-btn to="/test-api" class="full-width" label="BackEnd API Test"/>
  </q-drawer>
</template>

<script>
import { ref, onMounted } from 'vue';
const menusList = [
  { label : 'index', to: '/', separator: true},
  { label : 'composition API', to: '/composition', separator: false},
  { label : 'composition Store', to: '/use-store', separator: false},
  { label : 'BackEnd API Test', to: '/test-api', separator: true},
]
export default {
  props:{
    leftDrawerOpen: Boolean
  },
  setup(props) {
    

    return {
      drawer: props.leftDrawerOpen,
      menusList
    }
  }
}
</script>

<style>

</style>