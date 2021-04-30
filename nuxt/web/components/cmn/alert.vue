<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="290"
      z-index="10000"
    >
      <v-card>
        <!-- <v-card-title class="headline">Use Google's location service?</v-card-title> -->
        <v-card-text>
          <v-alert :type="type">
          {{ text }}
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="close"
          >
            확인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  //type은 success, info, warnin, error 이렇게 4가지를 쓸 수 있음
  props: ['text', 'show', 'type'],
  data() {
    return {
      dialog: false
    }
  },
  watch: {
    show() {
      console.log("alert : ", show);
      if (show) {
        this.dialog = show;
      }
    }
  },
  methods: {
    close() {
      this.dialog = false;
    }
  }
}
</script>

<style>

</style>