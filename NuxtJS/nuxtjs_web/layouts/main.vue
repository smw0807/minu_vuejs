<template>
<div>
  <topmenu/>
  <div class="col-sm-12">
    <nuxt/>
  </div>
</div>
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