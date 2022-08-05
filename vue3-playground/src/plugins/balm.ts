
import { App } from 'vue';
import BalmUI from 'balm-ui';
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus';
export function setupBalmUI(app: App) {
  app.use(BalmUI);
  app.use(BalmUIPlus);
}