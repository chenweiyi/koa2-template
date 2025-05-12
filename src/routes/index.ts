import RouterEngine from '@koa/router';
const router = new RouterEngine();

router.prefix('/api');

/**
 * get请求需要headers中携带`accept`属性，例如
 * accept: application/json
 */
router.get('/hello', ctx => {
  ctx.body = {
    code: 0,
    data: 'hello world',
  };
});

router.post('/getData', async ctx => {
  await Promise.resolve();
  ctx.body = {
    code: 0,
    data: [{
      id: 1,
      age: 18,
    }],
  };
});

export { router };
