/**
 * element+ 디자인 프레임워크 적용
 * 공식 홈페이지 : https://element-plus.org/en-US/
 * 참고 깃허브 : https://github.com/element-plus/element-plus-vite-starter
 */
import { App } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/display.css'

export function setupElementPlus(app: App) {
  app.use(ElementPlus);
}