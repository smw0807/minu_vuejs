<template>
  <v-container fluid>
    <v-layout column class="ma-1">
      <v-row>
        <v-col>
          <exec/>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import exec from '~/components/test/exec'
export default {
  components:{
    exec,
  }
}
</script>

<style>

</style>