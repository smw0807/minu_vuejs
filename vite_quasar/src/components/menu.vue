<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :width="250"
    :breakpoint="500"
    bordered
    class="bg-grey-12"
  >
    <q-scroll-area class="fit">
      <q-list>
        <template v-for="(menuItem, index) in menuList" :key="index">
          <q-item
            clickable
            :active="menuItem.label === 'Outbox'"
            v-ripple
            :to="menuItem.to"
          >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
          <q-separator :key="'sep' + index" v-if="menuItem.separator" />
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script>
const menuList = [
  { label: 'index', to: '/', separator: true },
  { label: 'composition API', to: '/composition', separator: false },
  { label: 'composition Store', to: '/use-store', separator: true },
  { label: 'vue-timeaog3', to: '/vue-timeago', separator: true },
  { label: 'BackEnd API Test', to: '/test-api', separator: true },
  { label: 'quasar ajax bar', to: '/quasar/ajax-bar', separator: false },
  { label: 'quasar abbbb', to: '/quasar/abbbb', separator: false },
];
export default {
  props: {
    drawer: Boolean,
  },
  setup(props) {
    return {
      menuList,
    };
  },
};
</script>

<style>
</style>