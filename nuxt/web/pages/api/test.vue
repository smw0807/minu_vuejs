<template>
  <v-card raised outlined class="pa-3">
    <h1>{{ pageName }}</h1>
    <v-row>
      <v-col cols="8">
        {{apiCheck}}
      </v-col>

      <v-col cols="4">
        <v-btn @click="api">API</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      pageName: 'API test',
      apiCheck: ''
    }
  },
  methods: {
    async api() {
      console.log('api');
      try {
        let rs = await this.$axios.post('/api/');
        console.log('Response : ' , rs);
        this.apiCheck = rs;
      } catch (err) {
        console.log('Error : ', err);
        this.apiCheck = err;
      }
    }
  }
}
</script>

<style>

</style>