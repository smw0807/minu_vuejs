<template>
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col cols="12">
          <event-bus/>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import eventBus from '@/components/vue/eventbus/eb1'
export default {
  components:{
    eventBus
  }
}
</script>

<style>

</style>