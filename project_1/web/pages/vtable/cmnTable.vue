<template>
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col cols="12"> {{ list }} </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    list: [],
  }),
  async created() {
    await this.getList();
  },
  methods: {
    async getList() {
      try {
        this.list = await this.$store.dispatch('datatables/GuestBookList', {});
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style>
</style>