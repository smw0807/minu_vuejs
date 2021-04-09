<template>
  <v-app>
    <main-menu/>
      <transition name="component-fade" mode="out-in">
        <v-main>
          <nuxt/>
        </v-main>
      </transition>
  </v-app>
</template>

<script>
import mainMenu from '~/components/mainMenu'
export default {
  components:{
   mainMenu
  },
  created() {
    this.$vuetify.theme.dark = true;
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