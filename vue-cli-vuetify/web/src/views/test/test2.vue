<template>
  <v-container fluid>
    <v-layout>
      <v-row>
        <v-col cols="12">
          <comp1/>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
/**
 * this.$emit을 이용한 데이터 송수신 테스트
 */
import comp1 from '@/components/emit/comp1'
export default {
  components:{
    comp1
  }
}
</script>

<style>

</style>