<template>
  <v-sheet
    class="mx-auto"
  >
    <v-slide-group
      show-arrows
    >
      <v-slide-item
        v-for="(item, index) in items"
        :key="index"
      >
        <v-chip
          v-if="item.type === 'include' && item.mode === 'direct'"
          class="ma-2"
          close
          @click:close="del_filter(index)"
          color="blue"
          small
        >
          {{item.text}} : *{{item.data}}*
        </v-chip>
        <v-chip
          v-else-if="item.type === 'include' && item.mode === 'indirect'"
          class="ma-2"
          close
          @click:close="del_filter(index)"
          color="blue"
          small
        >
          {{item.text}} : {{item.data}}
        </v-chip>
        <v-chip
          v-else-if="item.type === 'exclude' && item.mode === 'direct'"
          class="ma-2"
          close
          @click:close="del_filter(index)"
          color="error"
          small
        >
          {{item.text}} : *{{item.data}}*
        </v-chip>
        <v-chip
          v-else
          class="ma-2"
          close
          @click:close="del_filter(index)"
          color="error"
          small
        >
          {{item.text}} : {{item.data}}
        </v-chip>
       
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    items() {
      return this.$store.getters['GET_FILTERS'];
    }
  },
  methods:{
    del_filter(v) {
      let filter = this.$store.getters['GET_FILTERS'];
      filter.splice(v, 1);
      this.$store.commit('SET_FILTERS', filter);
      this.$emit('reload', true); //필터 데이터 수정하면 데이터 리로드하게 할 용도
    }
  }
}
</script>

<style>

</style>