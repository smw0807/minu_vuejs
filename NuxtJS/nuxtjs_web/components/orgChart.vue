<template>
  <v-navigation-drawer
    v-model="orgData"
    fixed
    temporary
    >
    <v-card
      max-width="256">
      <v-card-title>조직도</v-card-title>
      <v-card-text>
        조직도?
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
export default {
  name:'orgChart',
  props:{
    org: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  computed: {
    orgData() {
      console.log('org!! ', this.org);
      return this.org;
    }
  },
  methods: {
    
  },
}
</script>

<style>

</style>