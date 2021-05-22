<template>
  <v-card raised outlined>
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          {{result}}
        </v-col>
        <v-col cols="12" align="end">
          <v-spacer></v-spacer>
          <v-btn
            raised
            color="primary"
            @click="retry"
            :disabled="test"
            >
            다시!
          </v-btn>
        </v-col>
        
      </v-row>
      <v-row>
        <v-col cols="12" v-if="es_state===true">
          <v-alert
            dense
            text
            type="success"
          >
            ElasticSearch Connected Success!
          </v-alert>
        </v-col>
        <v-col cols="12" v-else-if="es_state===false">
          <v-alert
            dense
            text
            type="error"
          >
            <h3>ElasticSearch Connected Fail!</h3>
            <p>{{es_err_msg}}</p>
          </v-alert>
        </v-col>
        <v-col cols="12" align="end">
          <v-spacer></v-spacer>
          <v-btn
            raised
            color="primary"
            @click="es_test"
            :disabled="test"
            >
            ES Check!
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      title: 'express api check.',
      test: false,
      es_state: null,
      es_err_msg: '',
    }
  },
  created() {
    this.$store.dispatch('apitest');
  },
  computed: {
    result() {
      return this.$store.getters['GET_API_TEST'];
    }
  },
  methods: {
    retry() {
      this.$nuxt.$loading.start();
      this.test = true;
      this.$store.commit('SET_API_TEST', '');
      setTimeout(async () => {
        await this.$store.dispatch('apitest');
        this.test = false;
        this.$nuxt.$loading.finish();
      }, 1000);
    },
    async es_test() {
      try {
        this.$nuxt.$loading.start();
        const rs = await this.$store.dispatch('elasticTest');
        if (rs.data.msg === true) {
          this.es_state = true;
        } else {
          this.es_state = false;
          this.es_err_msg = rs.data.msg.message;
        }
        this.$nuxt.$loading.finish();
      } catch (err) {
        console.error('es_test err : ', err);
      }
    }
  }
}
</script>

<style>

</style>