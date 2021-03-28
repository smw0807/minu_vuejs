<template>
  <v-app id="app">
    <topmenu/>
    <v-main>
      <div class="col-sm-12">
        <transition name="component-fade" mode="out-in">
          <nuxt/>
        </transition>
      </div>
    </v-main>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .5s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
</style>