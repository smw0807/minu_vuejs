import { default as config } from '~/config.js';
export default function ({store}) {
  console.log('midd', store);
  store.commit('SET_CONFIG', config);
}

/** config 기능 만들어보기.
 * 빌드된 파일들로 실행중일 때 config.js 파일 값만 수정해서 
 * 해당 값에 따라 웹의 변화를 주고 싶어서 만들어 봄.
 * 
 * 제일 먼저 해보고 싶었던건 메뉴쪽이었음.
 * 
 * config.js안에 mode 값이 dev면 모든 메뉴를 보여주고 다른 값이면 특정 메뉴들만 보여주는 기능.
 * 
 * 어느 위치에서 만들면 좋을까 고민하다가
 * 특정 파일들은 빌드되면 파일이 달라지기도 하고, 웹 재구동 없이 적용 시키고 싶어서,
 * 컴포넌트마다 실행가능한 middlewere를 이용해 config.js 값을 읽고, store에 config.js 값을 commit해주고
 * 어느 컴포넌트던 필요할 때 꺼내서 쓸 수 있게 구상해서 만들어 봄.
 * 
 * 작업파일 
 * /nuxt.config.js
 * /menu.js
 * /config.js (추가파일)
 * /store/index.js (config 값 store에 저장)
 * /middleware/readConfig (config.js 값 읽어서 store에 commit)
 * /components/mainMenu.vue
 * 
 * 
 * + 추가 (2021-07-28)
 * 내가 생각했던거랑 다르게 작동된다.
 * 빌드 후 배포 모드로 실행할 때
 * 실행 중에 config.js를 바꿔도 적용되지 않는다.
 * 바꾼 후 껐다가 다시 실행해도 똑같다.
 * readConfig.js에서 config.js 파일을 새로 읽는 로직이 있는데
 * 빌드 때 읽은 값으로만 가져오는게 이해가 안된다.
 * 빌드할 때 처음 읽은 값으로 픽스를 시키는건가?
 */