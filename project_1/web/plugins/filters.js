/**
 * 글로벌 필터 기능 넣는곳
 */
console.log('plugin!!!!!');
import Vue from 'vue';

//숫자에 콤마 넣어주는거 
Vue.filter('ft_makeComma', val => {
  return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});