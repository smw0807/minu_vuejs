<template>
  <v-app dark>
    <v-layout column justify-center align-center>
      <v-flex xs12 sm12 md12>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-alert
              border="right"
              colored-border
              type="error"
              elevation="2"
            >
              <template v-if="error.statusCode === 404">
                <h1> {{ pageNotFound }} </h1>
              </template>
              <template v-else>
                <h1> {{ otherError }} </h1>
                <p> {{msg}}</p>
              </template>
              <v-btn
                color="error"
                link
                raised outlined
                to="/"
                >
                <v-icon>mdi-home-variant-outline</v-icon> 메인으로 돌아가기
              </v-btn>
            </v-alert>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      msg: '',
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    console.log(this.error);
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError

    this.msg = this.error.message;
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
