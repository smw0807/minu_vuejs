<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline">
          NuxtJS + Vuetify + Vuex + express + ElasticSearch
        </v-card-title>
        <v-card-text>
          <p>테스트 프로젝트</p>
          <p>1. VueJS 기반의 웹 애플리케이션 프레임워크인 NuxtJS</p>
          <p>2. VueJS에서 사용 가능한 UI 프레임워크인 VuetifyJS</p>
          <p>3. 상태 관리 라이브러리인 Vuex</p>
          <p>4. Axios 요청을 받아 API역할을 할 express</p>
          <p>5. 데이터를 저장할 ElasticSearch</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
