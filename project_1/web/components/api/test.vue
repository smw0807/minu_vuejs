<template>
  <v-card outlined>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          {{result}}
        </v-col>
        <v-col cols="12" align="end">
          <v-spacer></v-spacer>
          <v-btn
          raised
          color="primary"
          @click="retry"
          :disabled="test"
          >
          다시!
        </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      title: 'express api check.',
      test: false
    }
  },
  created() {
    this.$store.dispatch('apitest');
  },
  computed: {
    result() {
      return this.$store.getters['GET_API_TEST'];
    }
  },
  methods: {
    retry() {
      this.$nuxt.$loading.start();
      this.test = true;
      this.$store.commit('SET_API_TEST', '');
      setTimeout(async () => {
        await this.$store.dispatch('apitest');
        this.test = false;
        this.$nuxt.$loading.finish();
      }, 1000);
    }
  }
}
</script>

<style>

</style>