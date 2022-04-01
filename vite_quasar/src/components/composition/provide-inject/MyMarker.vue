<template>
  <div>
    location: {{userLocation}} | geolocation : {{userGeolocation}} <br>
    <q-btn color="primary" label="updateLocation" @click="updateLocation()"/>
  </div>
</template>
<script>
import { inject } from 'vue'
export default {
  // inject: ['location', 'geolocation']
  setup() {
    /**
     * inject 함수는 2개의 파라미터를 가진다.
     * 1. inject할 속성명
     * 2. 기본값 (선택사항)
     */
    const userLocation = inject('location', 'The Universe');
    // console.log('userLocation : ', userLocation);
    const userGeolocation = inject('geolocation');
    // console.log('userGeolocation : ', userGeolocation);
    const updateLocation = inject('updateLocation');
    
    return { 
      userLocation, 
      userGeolocation,
      updateLocation
    }
  }
}
</script>
<style lang="">
  
</style>