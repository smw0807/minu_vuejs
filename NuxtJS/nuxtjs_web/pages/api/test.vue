<template>
  <div class="row">
    <h1>API test</h1>
    <div class="col-sm-12">
      <div class="col-sm-8">{{apiCheck}}</div>
      <div class="col-sm-4">
        <button class="btn btn-primary" @click="api">API</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'main',
  data() {
    return {
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