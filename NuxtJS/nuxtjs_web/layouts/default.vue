<template>
  <v-app>
    <main-menu/>
    <v-main>
      <v-container fluid>
        <transition name="component-fade" mode="out-in">
          <nuxt/>
        </transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import mainMenu from '~/components/mainMenu'
export default {
  data () {
    return {
      drawer: true
    }
  },
  components:{
   mainMenu
  },
  created() {
    // console.log('created...', this.$vuetify);
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