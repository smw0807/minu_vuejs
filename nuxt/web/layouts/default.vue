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
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .5s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}
</style>