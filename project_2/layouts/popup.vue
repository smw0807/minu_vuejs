<template>
  <v-app dark>
    <alt/>
    <transition name="component-fade" mode="out-in">
      <v-main>
        <nuxt/>
      </v-main>
    </transition>
  </v-app>
</template>

<script>
import alt from '~/components/cmn/alert'
export default {
  data () {
    return {
    }
  },
  components:{
   alt,
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
}
</script>

<style>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .5s ease;
}
.component-fade-enter, .component-fade-leave-to {
  opacity: 0;
}

/* ======== 스크롤바 CSS =========== */
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>