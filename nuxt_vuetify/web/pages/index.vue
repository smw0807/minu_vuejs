<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="text-xs-center">
        <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      </div>
      <v-card>
        <v-card-title class="headline">Vuetify + Nuxt.js 템플릿에 오신 것을 환영합니다.</v-card-title>
        <v-card-text>
          <p>Vuetify는 Vue.js를 위한 점진적인 재료 설계 구성요소 프레임워크이다. 이 제품은 개발자들이 놀라운 애플리케이션을 만들 수 있도록 지원하기 위해 설계되었습니다.</p>
          <p>Vuetify에 대한 자세한 내용은 <a href="https://vuetifyjs.com" target="_blank">설명서</a>를 참조하십시오.</p>
          <p>Vuetify와 함께 개발해주셔서 감사드리며 앞으로 더욱 흥미로운 기능을 제공할 수 있기를 기대합니다.</p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3">
          <a href="https://nuxtjs.org/" target="_blank">Nuxt Documentation</a>
          <br>
          <a href="https://github.com/nuxt/nuxt.js" target="_blank">Nuxt GitHub</a>
          <br>
          <a href="https://vuetifyjs.com/en/introduction/why-vuetify/#guide" target="_blank">Vuetify Documentation</a>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat nuxt to="/inspire">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
