import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  /**
   * 미들웨어 모로 Vite 서버를 생성, 애플리케이션 타입을 custom
   * Vite의 자체 HTML 제공 로직을 비활성화하고, 상위 서버에시 이를 제어할 수 있도록함
   */
  const vite = await createViteServer({
    server: {
      middlewareMode: 'ssr',
    },
    appType: 'custom',
  });

  //vite를 미들웨어로 사용.
  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalRul;
    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      );

      template = await vite.transformIndexHtml(url, template);

      const { render } = await vite.ssrLoadModule('/src/entry-server.js');

      const appHtml = await render(url);

      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (err) {
      vite.ssrFixStacktrace(err);
      next(err);
    }
  });

  app.listen(5100);
}

createServer();
