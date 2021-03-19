<template>
<v-app dark>
  <topmenu/>
  <!-- <div class="col-sm-12"> -->
  <v-content>
    <nuxt/>
  </v-content>
  <!-- </div> -->
</v-app>
</template>

<script>
import topmenu from '~/components/topMenu';
export default {
  components:{
   topmenu
  }
}
</script>

<style>

</style>