<template>
  <div class="row">
   <div class="col">
     <q-btn @click="sendAPI" label="API Test"/> 
   </div>
   <div class="col">
   </div>
 </div>
</template>

<script>
export default {
  methods: {
    async sendAPI() {
      console.log('sendAPI,...');
      console.log(this.axios);
    }
  }
}
</script>

<style>

</style>