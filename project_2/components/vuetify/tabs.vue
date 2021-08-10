<template>
  <v-card color="basil">
    <v-card-title class="text-center justify-center py-6">
      <h1 class="font-weight-bold text-h2 basil--text">
        BASiL
      </h1>
    </v-card-title>

    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card
          color="basil"
          flat
        >
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      tab: null,
      items: [
        'Appetizers', 'Entrees', 'Deserts', 'Cocktails',
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
  mounted() {
    this.tab = 2; //deserts 탭이 선택됨
    /**
     * 선택한 탭의 index가 아닌 해당 탭의 값으로 선택할 수 있는 방법은 없을까?
     */
  },
  watch: {
    tab(v) {
      console.log('tab : ', v); 
    }
  },
}
</script>

<style>
.basil {
  background-color: #000 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>