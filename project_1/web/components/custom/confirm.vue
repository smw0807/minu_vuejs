/** 작업자 : 송민우 */
<template>
  <v-overlay
    :value="is_show"
    z-index="100005"
    >
    <v-alert :type="type" border="right" colored-border>
      <v-row>
        <v-col cols="12">
          {{ title }}
        </v-col>
        <v-col cols="12">
          {{ text }}
        </v-col>
      </v-row>
      <v-row >
        <v-col cols="12" align="end">
          <v-btn
              color="green darken-1"
              @click="ok"
            >
              예
            </v-btn>
          <v-btn
              color="green darken-1"
              outlined
              @click="cancel"
            >
              아니요
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
      is_show: false,
      type: '',
      title: '',
      text: '',
      result_ok :  undefined,
      result_cancel : undefined,
    }
  },
  methods:{
    open (options) {
      this.is_show = true;
      this.type = options.type;
      this.title = options.title;
      this.text = options.text;
      return new Promise( (resolve, reject) => {
        this.result_ok = resolve;
        this.result_cancel = reject;
      })
    },
    ok() {
      this.is_show = false;
      this.result_ok(true);
    },
    cancel() {
      this.is_show = false;
      this.result_ok(false);
    }
  }
}
</script>

<style>

</style>