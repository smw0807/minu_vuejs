/**
 * element+ 디자인 프레임워크 적용
 * 공식 홈페이지 : https://element-plus.org/en-US/
 */
import { App } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

export function setupElementPlus(app: App) {
  app.use(ElementPlus);
}