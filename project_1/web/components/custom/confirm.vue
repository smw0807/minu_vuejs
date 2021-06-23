<template>
  <v-overlay
    :value="is_show"
    z-index="100005"
    >
    <v-alert 
      :type="confirm_data.type"
      border="right"
      colored-border
      >
      <v-row>
        <v-col cols="12">
          {{ confirm_data.title }}
        </v-col>

        <v-col cols="12">
          {{ confirm_data.text }}
        </v-col>
  
        <v-col cols="6" align="center" >
          <v-btn
            @click="ok"
            block
            >
            Ok
          </v-btn>
        </v-col>

        <v-col cols="6" align="center">
          <v-btn
            text
            outlined
            block
            @click="close"
            >
            Close
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </v-overlay>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    is_show() {
      return this.$store.getters['GET_CONFIRM'];
    },
    confirm_data() {
      return this.$store.getters['GET_CONFIRM_DATA'];
    }
  },
  methods: {
    ok() {
      console.log('confirm Ok!');
    },
    close() {
      console.log('confirm Close!');
    }
  }
}
</script>

<style>

</style>