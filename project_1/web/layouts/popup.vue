<template>
  <v-app>
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
  components:{
    alt,
  },
  created() {
    console.log('layout/default env : ', this.$config.mode);
    const theme = localStorage.getItem('theme');
    if (theme === null) {
      this.$vuetify.theme.dark = true;
      localStorage.setItem('theme', 'light');
    } else {
      this.$vuetify.theme.dark = (theme === 'dark' ? true : false);
    }
  }
}
</script>

<style>
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