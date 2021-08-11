/**
 * 변수에 템플릿 만들어서 export해주고
 * vue 파일에서 import 후 components에 넣어 주면 사용할 수 있지 않을까 했다.
 * [Vue warn]: Failed to mount component: template or render function not defined.
 * 이런 에러문구 발생하면 안된다.
 */
const com1 = {
  template: '<div> test com1 </div>'
}
const com2 = {
  template: '<div> test com2 </div>'
}
const com3 = {
  template: '<div> test com3 </div>'
}
const com4 = {
  template: '<v-btn @click="test">test btn</v-btn>',
  methods: {
    test(){
      console.log('test btn click!!!');
    }
  },
}
//============================================================
/**
 * 렌더함수는 vue 파일에서 불러와서 사용가능하다.
 */
const com11 = {
  render(h) {
    return (
      <div>
        test com11
      </div>
    )
  }
}
const com22 = {
  render(h) {
    return (
      <div>
        test com22
      </div>
    )
  }
}
const com33 = {
  render(h) {
    return (
      <div>
        <v-btn>test com33</v-btn>
      </div>
    )
  },
}
// const com44 = {
//   render(h) {
//     return (
//       <div>
//         <v-btn v-on:click="test">test com33</v-btn> //vue 속성 @click 같은게 안됨..
//       </div>
//     )
//   },
//   methods: {
//     test() {
//       console.log('test click!!');
//     }
//   }
// }

export default {
  com1, com2, com3, com4,
  com11, com22, com33
}