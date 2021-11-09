
const aRoot = require('app-root-path');
const Logd = require(aRoot + '/log');
const log = new Logd('nuxt');

export default ( {app}, inject) => {
  inject('Log', log);
  // this.$Log 로 사용 가능하다고 하는데 이건 일단 안됨
}
