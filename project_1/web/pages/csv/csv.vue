<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <csv/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/**
 * csv 파일 생성시 할글 깨짐
 * https://www.zerocho.com/category/NodeJS/post/5e7d8cd964e50c001fe76dfe
 */
import csv from '@/components/csv/csv';
export default {
  components : {
    csv
  }
}
</script>

<style>

</style>