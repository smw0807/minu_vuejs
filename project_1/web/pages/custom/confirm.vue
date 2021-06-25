<template>
  <v-layout column>
    <confirm ref="cf" />
    <v-flex class="ma-4">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>공용 confirm 컴포넌트 만들어보기</v-card-title>
            <v-card-text>
              <v-btn @click="go">confirm go!</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>

  </v-layout>
</template>

<script>
import confirm from '~/components/custom/confirm'
export default {
  components: {
    confirm
  },
  methods:{
    go() {
      console.log('go!');
      const rs = await this.$refs.cf.open({
        type:'success',
        title: 'Confirm!!',
        text: 'Ok??'
      });
      if (rs) {
        console.log('true!!!');
      } else {
        console.log('false!!!');
      }
    }
  }
}
</script>

<style>

</style>