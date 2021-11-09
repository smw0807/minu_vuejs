
const aRoot = require('app-root-path');
const Logd = require(aRoot + '/log');
const log = new Logd('nuxt');

import Vue from 'vue';
Vue.prototype.$log = log;
