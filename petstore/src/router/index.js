import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/components/Form' //Form 컴포넌트를 불러온다.
import Main from '@/components/Main' //Main 컴포넌트를 불러온다.
import Product from '@/components/Product' // 매개변수를 사용해보자.
import EditProduct from '@/components/EditProduct' //자식 경로를 써보자.
Vue.use(Router)

export default new Router({
  mode: 'history', // 해시를 사용하는 경로의 히스토리 모드이다. 이걸 쓰면 주소에 addr:port/#/ 이 아니라 addr:port/로 사용할 수 있다.
  routes: [
    {
      path: '/',
      name: 'iMain',
      component: Main,
      props: true
    },
    {
      path: '/form', //웹브라우저에 접속할 때 필요한 URL
      name: 'Form',
      component: Form, //해당 경로에서 사용할 컴포넌트
      props: true //Vue.js에서 컴포넌트가 받아야 할 속성이 있는지 정함
    },
    {
      path: '*', //위에 선언된 이외의 경로가 들어오면 / 로 리다이렉트 처리를 시키는 듯함
      redirect: "/"
    },
    {
      path: '/product/:id', //id라는 동적 경로 세그먼트를 표시
      name: 'Id',
      component: Product,
      props: true,
      children: [ // id 경로에서만 보이는 새로운 자식 경로를 정의한다.
        {
          path: 'edit',
          name: 'Edit',
          component: EditProduct,
          props: true
        }
      ]
    }
  ]
})
