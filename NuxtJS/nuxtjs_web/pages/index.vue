<template>
  <section class="container">
    <div>
      <app-logo/>
      <h1 class="title">
        NuxtJS_Web
      </h1>
      <h2 class="subtitle">
        Made in Song Min Woo.
      </h2>
      <p>NuxtJS를 이용한 웹 애플리케이션 입니다.</p>
      <p>vue init nuxt-community/starter-template project-name로 생성한 프로젝트를 베이스로 만들었습니다.</p>
      <p></p>
      <div class="links">
        <a href="/main" class="button--green">
        Go Main</a>
        <!-- <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a> -->
        <a
          href="https://github.com/smw0807/minu_vuejs/tree/master/NuxtJS"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

