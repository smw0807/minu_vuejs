<template>
  <div>
    main test
    <button class="btn btn-primary">Bootstrap CSS 적용 확인</button>
    <router-link tag="button" class="btn btn-info" :to="{path:'/'}">Home</router-link>
    <button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="left" title="Tooltip on left">Tooltip on left</button>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>