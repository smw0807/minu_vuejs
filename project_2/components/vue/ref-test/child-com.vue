<template>
  <div>
    <span>text : {{text}}</span>
    <v-btn @click="goEmit()">Emit gogo</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    upd() {
      this.text = 'hi';
    },
    goEmit() {
      this.$emit("go_1");
    }
  }
}
</script>

<style>

</style>