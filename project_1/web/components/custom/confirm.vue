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
        <v-col cols="12" v-html="change(text)">
        </v-col>
      </v-row>
      <v-row >
        <v-col cols="12" align="end">
          <v-btn
            :color="type"
            @click="ok"
            >
              예
            </v-btn>
          <v-btn
            text
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
      type: 'info', //success, info, warning, error 이렇게 4가지 사용 가능
      title: '',
      text: '',
      result : undefined,
      result_ok :  undefined,
      result_cancel : undefined,
    }
  },
  mounted() {
    document.addEventListener('keydown', this.onKeyEvent);
  },
  methods:{
    onKeyEvent(e) {
      if (this.is_show) {
        let code = e.keyCode;
        console.log(code);
        if (code === 27) { //esc
          this.cancel();
        } else if (code === 13) { //enter
          this.ok();
        } else {
          e.stopPropagation();
          e.preventDefault();
        }
      }
    },
    change(v) {
      return String(v).replace(/(?:\r\n|\r|\n)/g,"</br>");
    },
    open (options) {
      this.is_show = true;
      this.type = options.type === (null || '') ? 'info' : options.type;
      this.title = options.title;
      this.text = options.text;
      return new Promise( (resolve, reject) => {
        this.result = resolve;
        // this.result_ok = resolve;
        // this.result_cancel = reject;
      })
    },
    ok() {
      this.is_show = false;
      this.result(true);
      // this.result_ok(true);
    },
    cancel() {
      this.is_show = false;
      this.result(false);
      // this.result_ok(false);
    }
  }
}
</script>

<style>

</style>