// const aRoot = require('app-root-path');
// const Logd = require(aRoot + '/log');
// const log = new Logd('nuxt');

export default ({ app, store }, inject) => {
  // inject('Log', log);
  console.log(store);
  // this.$Log 로 사용 가능하다고 하는데 이건 일단 안됨
};
