<template>
  <v-container fluid>
    <v-layout column>
      <v-row>
        <v-col cols="12">
          <upload/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <list/>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import upload from '@/components/file/file'
import list from '@/components/file/list-table'
export default {
  components: {
    upload, list
  }

}
</script>

<style>

</style>