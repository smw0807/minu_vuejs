<template>
  <v-slide-group show-arrows>
    <v-slide-item v-for="(filter, index) in filters" :key="index">
      <v-chip
        class="mx-1"
        :class="filter.mode === 'include' ? 'blue' : 'error'"
        small
        rounded
        depressed
        close
        @click:close="del_filter(index)"
        >
        <template v-if="filter.type === 'direct' && filter.data2">
          <strong>{{ filter.name }} : {{ filter.data}} ~ {{ filter.data2 }}</strong>
        </template>
        <template v-else-if="filter.type === 'direct'">
          <strong>{{ filter.name }} : *{{ filter.data}}*</strong>
        </template>
        <template v-else-if="filter.field === 'is_use'">
          <strong>{{ filter.name}} : {{filter.data | fmt_is_use }}</strong>
        </template>
        <template v-else>
          <strong>{{ filter.name }} : {{ filter.data}}</strong>
        </template>
      </v-chip>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
export default {
  computed: {
    filters() {
      return this.$store.getters['GET_FILTERS'];
    }
  },
  filters: {
    fmt_is_use(v) {
      if (v === true || v === 'true') {
        return '사용';
      } else if (v === false || v === 'false') {
        return '사용안함';
      }
    }
  },
  methods:{
    del_filter(v) {
      let filter = this.$store.getters['GET_FILTERS'];
      console.log(filter)
      filter.splice(v, 1);
      this.$store.commit('SET_FILTERS', filter);
      this.$emit('reload', true); //필터 데이터 수정하면 데이터 리로드하게 할 용도
    }
  }
}
</script>

<style>

</style>