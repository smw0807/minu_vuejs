<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        JWT Login
      </div>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  cretaed() {
    console.log('222');
  },
  mounted() {
    console.log('333');
  },

};
</script>
