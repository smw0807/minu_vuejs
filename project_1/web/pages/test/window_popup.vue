<template>
  <v-container fluid>
    <v-layout column>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-btn @click="open_component" width="100%">component 파일 팝업 띄우기</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn @click="open_page" width="100%">page 파일 팝업 띄우기</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
/**
 * window.open 대한 고민...
 * nuxt는 pages 디렉터리 안에 있는 구조대로 라우터 정보를 만들어 준다.
 * 팝업을 띄울 때 window.open(url, name, options) 이렇게 작성하는데.
 * url을 입력하면 pages 디렉터리 안에 있는 파일만 가능하다.
 * 그러면 이제 여기서 생각해볼게 3가지가 있다.
 * 1. 팝업의 경우 메뉴같은 부분은 필요 없기 때문에 layout 디렉터리에 필요 화면만 보여줄 popup용 vue 파일을 생성한다.
 * 2. 팝업으로 components 디렉터리에 있는 컴포넌트만 보여줘야 하는 경우.
 * 3. pages 디렉터리에 있는 파일을 보여줘야 하는 경우.
 * 이렇게 이다.
 * 
 * 1은 일단 그냥 만들면 되고,
 * 
 * 2의 경우 pages에 따로 디렉터리와 그 안에 파일을 작성 후 해당 파일의 layout을 popup용 파일로 지정해준 후
 * 컴포넌트 파일을 import해서 화면에 보여주게 작성 한다.
 * 그리고 window.open(만든pages경로) 이런 식으로 열리게 한다.
 * 대신 pages 속 vue파일은 컴포넌트에 대한 그리드 잡는 소스만 작성해야 한다.
 * 그래야 component 파일만 수정해도 기본 레이아웃 화면과 팝업 레이아웃 화면 둘다 적용이 되기 때문에.
 * 결국 문제점이 있다면 팝업을 위해 별도의 파일을 생성해야 한다는 부분이다.
 * 
 * 3의 경우 pages 디렉터리기 때문에 url을 그대로 사용하면 된다.
 * 그리고 이게 기본 화면인지, window.open을 이용해 열린 것 인지는 opener를 이용해서 구분할 수 있다.
 * opener 값이 null일 경우에는 기본적인 화면이고, 
 * null이 아니면 window.open으로 열었다는 것을 구분할 수 있다.
 * 이건 페이지 자체를 띄우는 것이기 때문에 별도로 파일을 생성할 필요는 없다.
 */
 window.receive_signal = function() {
   /**
    * 어쩔수 없이 팝업을 통해 만들어야 하는 상황이 있었는데
    * 팝업에서 이벤트를 완료하면 팝업 쪽에서 store의 dispatch를 실행해 리스트를 다시 읽는 부분을 실행 시켰으나
    * 팝업 쪽에선 정상적으로 처리가 됐지만. 그 새로운 리스트는 부모 쪽에서 출력이 되어야하는데.
    * computed로 해놨지만 반응이 없었다.
    * 팝업을 통해 처리하면 같은 store여도 분리되어 인식되는 것 같았다.
    * 그럼 자식에서 부모 쪽으로 리스트를 새로 리스트를 부르라는 신호를 보내야하는 방법 말곤 없는 것 같아서
    * 자바스크립트의 window 기능을 써서해보니 기능은 정상 작동한다.
    * 순서는 이렇다.
    * 1. 부모에서 window.open으로 자식 객체인 팝업창을 연다.
    * 2. 팝업에서 데이터 등록 등 데이터 갯수에 영향을 주는 이벤트를 실행한다.
    * 3. 정상 처리가 되면 부모 쪽으로 리스트를 새로 불러오라는 actions를 실행시킨다.
    *  - 이부분은 export default 안에서 불가능 하기 때문에 밖에다 window.name = function () {} 을 만들어 주고
    *   이 function을 실행 시키게 한다.
    *  - export default 밖에서는 this.$store가 안되고 this.$nuxt.$store를 사용하면 된다.
    * 4. 부모 쪽에 연결된 store를 실행해서 리스트 데이터가 바뀌면 computed가 인식을 해서 새로운 데이터를 가져와준다.
    * 
    * 이런식으로 처리가 된다.
    * 
    * 물론 이 방법은 고객의 요청이 아니라면 절대 하지 않는게 맞다고 본다.
    */
   console.log('자식 팝업으로 부터 요청됨.');
   this.$nuxt.$store.dispatch('popup/test');
 }
export default {
  layout() {
    if (opener) {
      console.log('This is window.open');
      return 'popup'
    }
  },
  data() {
    return {
      pop: null,
    }
  },
  mounted() {
    console.log('test : ', opener);
  },
  watch: {
    pop(v) {
      console.log('pop : ', v);
    }
  },
  methods: {
    open_component() { // 2번에 대한 방법.
      this.pop = window.open("/test/popup/popup", "open_component", "width=500, height=150");
    },
    open_page() { // 3번에 대한 방법.
      this.pop = window.open("/test/window_popup", "open_page", "width=1024, height=768");
    },
  },
}
</script>

<style>

</style>