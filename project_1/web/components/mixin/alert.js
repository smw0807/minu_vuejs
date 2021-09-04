export const alert = {
  template: `<v-overlay
  :value="alert_show"
  z-index="100005"
  >
  <v-alert 
    :type="alert_type"
    colored-border
    border="right"
    >
    <v-row>
      <v-col cols="12">
        {{ alert_title}}
      </v-col>
      <v-col cols="12" v-html="change(alert_text)">
      </v-col>
    </v-row>
    <v-row>
     <v-col cols="12" align="end">
        <v-btn
          outlined
          @click="alert_close"
          >
          확인
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</v-overlay>
  `,
  data() {
    return {
      alert_show: false,
      alert_type: 'primary',
      alert_title: '',
      alert_test: '',
      alert_result: undefined, //promise때 사용할거
    }
  },
  created() {
    console.log('alert mixin created');
    this.alert_reset();
  },
  destroyed() {
    console.log('alert mixin destroyed');
    this.alert_reset();
  },
  methods: {
    alert_dataSetting(v) {
      this.alert_show = true;
      this.alert_type = v.type;
      this.alert_title = v.title;
      this.alert_text = v.text;
    },
    alert_reset() {
      this.alert_show = false;
      this.alert_type = 'primary';
      this.alert_title = '';
      this.alert_text = '';
      this.alert_result = undefined;
    },
    alert_asyncOpen(v) {
      this.alert_dataSetting(v);
      return new Promise( (resolve, reject) => {
        this.alert_result = resolve;
        this.alert_reset();
      })
    },
    alert_asyncClose() {
      this.alert_result(true);
    },
    alert_open(v) {
      console.log('mixin alert_open');
      // this.alert_dataSetting(v);
      this.alert_show = true;
      this.alert_type = v.type;
      this.alert_title = v.title;
      this.alert_text = v.text;
    },
    alert_close() {
      this.alert_reset();
    }
  }
}