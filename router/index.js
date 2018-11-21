import Router from 'koa-router';
import { hello } from '../controller/Hello';
import { seckill } from '../controller/Seckill';

const router = new Router();

router.get('/hello', (ctx, next) => {
    ctx.body = hello();
});

router.get('./seckill', (ctx, next) => {
    seckill();
});

module.exports = router;