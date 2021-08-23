<template>
  <v-overlay
    :value="is_show"
    z-index="100005"
    >
    <v-alert 
      :type="type"
      colored-border
      border="right"
      >
      <v-row>
        <v-col cols="12">
          {{ title}}
        </v-col>
        <v-col cols="12" v-html="change(text)">
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
  data() {
    return {
      is_show: false,
      type : 'success',
      title : '',
      text: '',
      result : undefined,
    }
  },
  methods: {
    open(options) {
      this.is_show = true;
      this.type = options.type;
      this.title = options.title;
      this.text = options.text;
      return new Promise( (resolve, reject) => {
        this.result = resolve;
      })
    },
    change(v) {
      return String(v).replace(/(?:\r\n|\r|\n)/g,"</br>");
    },
    close() {
      this.is_show = false;
      this.result(true);
    }
  }
}
</script>

<style>

</style>