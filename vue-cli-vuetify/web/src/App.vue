<template>
  <v-app>
    <!-- <v-app-bar app >
      <div class="d-flex align-center">
        JWT Login
      </div>
      <v-spacer></v-spacer>
    </v-app-bar> -->
    <v-app-bar
      app
      flat
    >
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      ></v-avatar>

      <v-tabs
        centered
        class="ml-n9"
        color="grey darken-1"
      >
        <v-tab
          v-for="link in links"
          :key="link"
        >
          {{ link }}
        </v-tab>
      </v-tabs>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      ></v-avatar>
    </v-app-bar>

    <v-main >
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              <!-- 왼쪽 -->
            test
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="8"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <!-- 센터  -->
              <router-view/>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              <!-- 오른쪽 -->
              ㅋㅋ
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main> -->
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ],
    }
  },
  components: {
  },

  cretaed() {
  },
  mounted() {
    console.log('env test : ', process.env);
  },

};
</script>
