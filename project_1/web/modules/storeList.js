import * as store from '../plugins/log.js';
export default ({ context }) => {
  console.log(store);
  // console.log('store List ', context);
  // console.log('store List ', window.$nuxt.$store);
  // const store = vuex.Store();
  // console.log('store list : ', store);
};
