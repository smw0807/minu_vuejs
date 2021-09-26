<template>
  <v-app>
    <v-app-bar
      app
      flat
    >
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      ></v-avatar>

      <v-tabs
        v-model="tab"
        centered
        class="ml-n9"
        color="grey darken-1"
      >
        <v-tab
          v-for="tab in tabs"
          :key="tab"
        >
          {{ tab }}
        </v-tab>
      </v-tabs>

      <v-avatar
        color="grey darken-1 shrink"
        size="32"
      ></v-avatar>
    </v-app-bar>

    <v-main >
      <v-container>
        <v-row>
          <v-col cols="12" sm="2">
            <v-sheet
              rounded="lg"
              min-height="268"
              >
              <!-- 왼쪽 -->
            <leftMenu/>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <v-sheet
              min-height="70vh"
              rounded="lg"
              >
              <!-- 센터  -->
              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <router-view/>
                </v-tab-item>
                <v-tab-item>
                  1
                </v-tab-item>
                <v-tab-item>
                  2
                </v-tab-item>
                <v-tab-item>
                  3
                </v-tab-item>

              </v-tabs-items>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="2">
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

  </v-app>
</template>

<script>
import leftMenu from '@/components/leftMenu'
export default {
  name: 'App',
  data() {
    return {
      tab: null,
      tabs: [
        'SHOW',
        'Messages',
        'Profile',
        'Updates',
      ],
    }
  },
  components: {
    leftMenu
  },

  cretaed() {
  },
  mounted() {
  },

};
</script>
