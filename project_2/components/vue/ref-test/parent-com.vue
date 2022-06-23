<template>
  <v-card>
    <v-card-title>자식 컴포넌트 함수 실행 테스트 2가지</v-card-title>
    <v-divider/>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <child 
            ref="child_1"
            @go_1="$refs.child_1.upd()"
            />
        </v-col>
        <v-col cols="12">
          <child ref="child_2"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn @click="go_2()">GO 2</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
/**
 * go_1 : 자식 컴포넌트에서 go_1 emit해서 자기 자신 함수 실행
 * go_2 : 부모 컴포넌트에서 자식 컴포넌트 안에 있는 함수 실행
 */
import child from './child-com';
export default {
  components: {
    child
  },
  methods: {
    go_2() {
      this.$refs.child_2.upd();
    }
  }
}
</script>

<style>

</style>