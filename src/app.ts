import debugLibrary from 'debug';
import Koa from 'koa';
import cors from 'koa2-cors';
import history from 'koa2-history-api-fallback';
import bodyparser from 'koa-bodyparser';
import etag from 'koa-etag';
import json from 'koa-json';
import logger from 'koa-logger';
import onerror from 'koa-onerror';
import serve from 'koa-static';
import conditional from './utils/koa-conditional-get';
import { router } from './routes';
import path from 'path';
import { getDirname } from './utils/tool';

const debug = debugLibrary('app');

const app = new Koa();

// @ts-ignore
app.sharedData = {
  deploying: new Set(),
};

app.use(
  cors({
    origin: '*',
    allowHeaders: ['*'],
  }),
);

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  }),
);

app.use(json());
app.use(logger());

app.use(history());

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// etag 304
app.use(conditional());
app.use(etag());

// routes
app.use(router.routes()).use(router.allowedMethods());


// front
app.use(
  serve(path.resolve(getDirname(), '../..', 'public'), {
    // 设置cache-controll缓存时间
    maxage: 1000 * 60 * 60 * 2,
    // index.html禁止缓存
    setHeaders(res, filePath) {
      const { base } = path.parse(filePath);
      if (base === 'index.html') {
        res.setHeader('Cache-Control', 'max-age=0');
      }
    },
    // 异步，先执行后续中间件
    defer: true,
  }),
);

// error-handling
app.on('error', (err, ctx) => {
  if (err?.message === 'Authentication Error') {
    debug('Authentication Error');
  } else {
    debug('catch error:', err, ctx);
  }
});

export default app;
