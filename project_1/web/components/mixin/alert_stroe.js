export const alert_mixin = {
  methods: {
    open_alert(v) {
      console.log('open_alert : ', v);
      this.$store.dispatch('updateAlert', {
        alert: true,
        type: v.type,
        title: v.title,
        text: v.text
      })
    }
  }
}