export default function ExampleModule(moduleOptions) {
  console.log(moduleOptions.name); //! 실행 순서 : 1
  console.log(this.options.axios); //nuxt.config.js 에 있는 옵션 및 process.env 정보 등등 다 들어있는 것 같음
  console.log(this.options.proxy); //nuxt.config.js 에 있는 옵션 및 process.env 정보 등등 다 들어있는 것 같음
  // this.option에 찍히는 정보에 대한건 같은 디렉터리의 this.options 파일에 넣어둠 (2021-08-19)

  //Nuxt 작동 준비 완료시 실행
  this.nuxt.hook('ready', async nuxt => {
    console.log('Nuxt is ready'); //! 실행 순서 : 4

  });

  //후크 호출할 떄 처리되지 않은 오류
  this.nuxt.hook('error', async error => {
    // Your custom code here
    console.log('Nuxt is error', err);
  });

  //Nuxt 인스턴스가 정상적으로 종료
  this.nuxt.hook('close', async nuxt => {
    // Your custom code here
    console.log('Nuxt is close');
  });

  //Nuxt 내부 서버가 수신을 시작? (nuxt start or nuxt dev 사용? 이건 먼소린지 찾아봐야 할 것 같음)
  this.nuxt.hook('listen', async (server, { host, port }) => {
    // Your custom code here
    console.log('Nuxt is listen'); //! 실행 순서 : 5
  })
  this.nuxt.hook('modules:done', moduleContainer => {
    // This will be called when all modules finished loading
    console.log('modules:done'); //! 실행 순서 : 2
  })

  this.nuxt.hook('render:before', renderer => {
    // Called after the renderer was created
    console.log('render:before'); //! 실행 순서 : 3
  })

  this.nuxt.hook('build:compile', async ({ name, compiler }) => {
    // Called before the compiler (default: webpack) starts
    console.log('build:compile'); //! 실행 순서 : 6 (빌드 완료시? 찍히는 것 같음)
  })

  this.nuxt.hook('generate:before', async generator => {
    // This will be called before Nuxt generates your pages
    console.log('generate:before')
  })
}

// // REQUIRED if publishing the module as npm package
// module.exports.meta = require('./package.json')

/**
 * 공식 문서를 읽어 봤지만 
 * 아직 내 기준에선 무엇에 써야할 지 감이 잡히는게 없음.
 * 제공 되는 기능도 많은 것 같고, 할 수 있는 것도 많은 것 같은데.
 * 잘 모르겠다.
 * 활용하는 사람들이 있는지 구글링을 통해 좀 찾아봐야 할 것 같다.
 */