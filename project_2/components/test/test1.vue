<template>
  <v-card>
    <v-card-title>Component Test</v-card-title>
    <v-card-text>
      <v-layout column>
        <v-flex>
          <com11/>
        </v-flex>
        <v-flex>
          <com22/>
        </v-flex>
        <v-flex>
          <com33/>
        </v-flex>
        <v-flex>
          <com1/>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
import { default as com } from '~/components/test'
// const com44 = {
//   render(h) {
//     return (
//       <div>
//         <v-btn v-on:click="test">test com33</v-btn> 
//       </div>
//     )
//   },
//   methods: {
//     test() {
//       console.log('test click!!');
//     }
//   }
// }//vue 속성 @click 같은게 안됨..

export default {
  components: {
    'com1' : com.com1,
    'com11' : com.com11,
    'com22' : com.com22,
    'com33' : com.com33,
    // 'com44' : com44
  }
}
</script>

<style>

</style>