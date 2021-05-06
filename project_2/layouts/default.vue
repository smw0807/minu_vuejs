<template>
  <v-app dark>
    <v-toolbar outlined dense flat dark>
      <!-- <v-app-bar-nav-icon> </v-app-bar-nav-icon> -->
      <v-app-bar-title class="mr-5" to="/">
          <route-link to="/" tag style="cursor:pointer">AF Manager</route-link>
      </v-app-bar-title>
      <!-- <v-spacer></v-spacer> -->
      <v-toolbar-items>
        <!-- <v-btn flat to="/">
            Home
        </v-btn> -->
        <v-menu open-on-hover offset-y transition="slide-x-transition" bottom right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn flat v-bind="attrs" v-on="on">
              Services
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item v-for="(item, index) in services" :key="index" router :to="item.link">
              <v-list-item-action>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn to="/about" flat>
            About Us
        </v-btn>
        <v-btn to="/contact" flat>
            Contact Us
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/signup" flat>Sign Up </v-btn>
        <v-btn to="/login" flat>login</v-btn>
      </v-toolbar-items>
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

    <transition name="component-fade" mode="out-in">
      <v-main>
        <nuxt/>
      </v-main>
    </transition>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      activate: true,
        theme: 1,
        themes: [{
                text: "Dark",
                icon: "mdi-clock"
            },
            {
                text: "Light",
                icon: "mdi-account"
            }
        ],
        mini: true,
        services: [{
                icon: "mdi-domain",
                title: "Media Monitoring",
                link: "/mmrservices"
            },
            {
                icon: "mdi-message-text",
                title: "Audience Measurement",
                link: "/amrservices"
            },
            {
                icon: "mdi-flag",
                title: "Integration Analysis"
            }
        ]
    }
  },
  created() {
    this.$vuetify.theme.dark = false;
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