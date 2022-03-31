<template lang="">
  <div>
    <MyMarker/>
  </div>
</template>
<script>
import { provide, reactive, ref, readonly } from 'vue'
import MyMarker from './MyMarker.vue'
export default {
  components: {
    MyMarker,
  },
  // provide:{
  //   location: 'North Pole',
  //   geolocation: {
  //     longitude: 90,
  //     latitude: 135
  //   }
  // }
  setup() {
    /**
     * provide 함수는 2개의 파라미터를 통해 속성을 정의할 수 있다.
     * 속성명(String 타입)
     * 속성값
     */
    // provide('location', 'North Pole'); 
    // provide('geolocation', {
    //   longitude: 90,
    //   latitude: 135
    // })

    //값에 반응성을 추가하기
    const location = ref('North Pole');
    const geolocation = reactive({
      longitude: 90,
      latitude: 135
    })

    const updateLocation = () => {
      location.value = 'South Pole'
    }

    // provide('location', location);
    provide('geolocation', geolocation);
    /**
     * 데이터가 inject된 컴포넌트 내부에서 데이터를 업데이트해야하는 경우엔
     * 반응형 속성을 변형시키는 메소드를 provide하는 것을 추천
     */
    provide('updateLocation', updateLocation);
    /**
     * provide를 통해 전달된 데이터가 inject된 컴포넌트에 의해 변경되지 않도록 하려면
     * provide 속성에 readonly를 사용하는 것이 좋다.
     */
    provide('location', readonly(location));
  }
}
</script>
<style lang="">
  
</style>