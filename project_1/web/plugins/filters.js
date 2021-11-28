/**
 * 글로벌 필터 기능 넣는곳
 */
console.log('plugin!!!!!');
import Vue from 'vue';

//숫자에 콤마 넣어주는거 
Vue.filter('ft_makeComma', val => {
  return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

Vue.filter('ft_byteToSize', size => {
  const fixed = 2;
  let str
  if (size >= 1024 * 1024 * 1024 * 1024) {
    size = size / (1024 * 1024 * 1024 * 1024);
    size = (fixed === undefined) ? size : size.toFixed(fixed);
    str = size + ' TB';
  } else if (size >= 1024 * 1024 * 1024) {
    size = size / (1024 * 1024 * 1024);
    size = (fixed === undefined) ? size : size.toFixed(fixed);
    str = size + ' GB';
  } else if (size >= 1024 * 1024) {
    size = size / (1024 * 1024);
    size = (fixed === undefined) ? size : size.toFixed(fixed);
    str = size + ' MB';
  } else if (size >= 1024) {
    size = size / 1024;
    size = (fixed === undefined) ? size : size.toFixed(fixed);
    str = size + ' KB';
  } else {
    size = (fixed === undefined) ? size : size.toFixed(fixed);
    str = size + ' byte';
  }
  return str;
})