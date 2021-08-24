<template>
  <v-app dark>
    <v-card tile>
      <v-toolbar dense dark>
        <v-app-bar-title class="mr-8">
              Project_2
        </v-app-bar-title>
        <v-toolbar-items>

          <v-menu open-on-hover offset-y transition="slide-x-transition" bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on">
                npm
              </v-btn>
            </template>
            <v-list dense dark>
              <v-list-item v-for="(item, index) in npm" :key="index" router :to="item.link">
                <v-list-item-action>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-menu open-on-hover offset-y transition="slide-x-transition" bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on">
                Vuetify
              </v-btn>
            </template>
            <v-list dense dark>
              <v-list-item v-for="(item, index) in vuetify" :key="index" router :to="item.link">
                <v-list-item-action>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-menu open-on-hover offset-y transition="slide-x-transition" bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on">
                test
              </v-btn>
            </template>
            <v-list dense dark>
              <v-list-item v-for="(item, index) in test" :key="index" router :to="item.link">
                <v-list-item-action>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-menu>

        </v-toolbar-items>

        <v-spacer></v-spacer>

        <v-menu open-on-hover transition="slide-x-transition" bottom right offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-card class="mx-auto" max-width="300" tile>
            <v-list dense>
              <v-subheader>THEMES</v-subheader>
              <v-list-item-group v-model="theme" color="primary">
                <v-list-item v-for="(item, i) in themes" :key="i" router :to="item.link">
                  <v-list-item-action>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-menu>
      </v-toolbar> 
    </v-card>
    
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
      activate: true,
      theme: 1,
      themes: [
        { text: "Dark", icon: "mdi-clock" }, 
        { text: "Light", icon: "mdi-account" }
      ],
      mini: true,

      npm: [
        { title: "Infinite Scrolling", link: "/aggrid/grid1" },
        { title: 'ag-grid-vue', link: '/aggrid/grid2'},
        { title: 'vue-modal-window', link: '/npm/modal'}
      ],

      vuetify: [
        { title: 'v-tabs', link: '/vuetify/tabs'}
      ],

      test: [
        { title: 'component test 1', link: '/test/test1'},
        { title: 'express execSync test', link: '/test/exec'},
        { title: 'component object props test', link: '/test/obj-props'},
      ]
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