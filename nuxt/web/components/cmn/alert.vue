<template>
  <v-overlay
    :value="is_show"
    z-index="100005"
    >
    <v-alert :type="dialog_data.type">
      <v-row>
        <v-col cols="12">
          {{ dialog_data.text }}
        </v-col>
      </v-row>
      <v-row justify="end">
       <v-col cols="5">
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
    dialog_data() {
      return this.$store.getters['GET_ALERT_DATA'];
    }
  },
  methods: {
    close() {
      this.$store.dispatch('updateAlert', {alert: false, type: 'error', text: ''});
    }
  }
}
</script>

<style>

</style>