<template>
  <v-overlay
    :value="is_show"
    z-index="100005"
    >
    <v-alert 
      :type="alert_data.type"
      colored-border
      border="right"
      >
      <v-row>
        <v-col cols="12">
          {{ alert_data.title}}
        </v-col>
        <v-col cols="12" v-html="change(alert_data.text)">
        </v-col>
      </v-row>
      <v-row>
       <v-col cols="12" align="end">
          <v-btn
            outlined
            @click="close"
            >
            확인
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </v-overlay>
</template>

<script>
export default {
  //type은 success, info, warning, error 이렇게 4가지를 쓸 수 있음
  computed: {
    is_show() {
      return this.$store.getters['GET_ALERT'];
    },
    alert_data() {
      return this.$store.getters['GET_ALERT_DATA'];
    }
  },
  methods: {
    change(v) {
      return String(v).replace(/(?:\r\n|\r|\n)/g,"</br>");
    },
    close() {
      this.$store.dispatch('updateAlert', {alert: false, type: 'error', text: ''});
    }
  }
}
</script>

<style>

</style>