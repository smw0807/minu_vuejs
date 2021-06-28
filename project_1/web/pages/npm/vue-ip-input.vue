<template>
  <v-layout column>
    <v-flex class="ma-4">
      <v-row>
        <v-col cols="12">
          <ip/>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
import ip from '~/components/npm/ip-input';

export default {
  components:{
    ip,
  }
}
</script>

<style>

</style>