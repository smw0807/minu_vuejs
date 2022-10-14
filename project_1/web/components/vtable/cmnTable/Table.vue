<template>
  <v-data-table
    :headers="headers"
    :items="data"
    hide-default-footer
    :loading="DataLoading"
    loading-text="데이터를 불러오는 중입니다."
    @click:row="row"
  >
    <template v-slot:[`item.btnDelete`]="{ item }">
      <v-btn color="error" small @click="$emit('del-row', item._id)"
        >삭제</v-btn
      >
    </template>
  </v-data-table>
</template>

<script>
/**
 * v-data-tables를 공통 컴포넌트로 사용할 수 있는 방법 생각중....
 * 공통으로 사용하게 된다면 고민해야되는 부분이 row를 그냥 데이터 그대로 보여주면 상관 없지만,
 * 각 row의 특정 column마다 데이터 변환을 한다거나 버튼을 추가해야 할 때.
 *
 * v-data-tables에서 제공하는 slot을 사용하면 될 것 같음
 * headers에서 특정 value 값이 있을 경우에는 위 소스처럼 작성하면 될 것 같음.
 */
export default {
  props: {
    headers: {
      type: Array,
      required: true,
      default: () => [],
    },
    data: {
      type: Array,
      require: true,
      default: () => [],
    },
    DataLoading: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  methods: {
    row(v) {
      this.$emit('select-row', v);
    },
  },
};
</script>

<style>
</style>