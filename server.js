import Koa from 'koa';
import Router from 'koa-router';
import cors from 'koa2-cors';
import projectRouter from './router';
import { initSys } from './controller/KafkaConsumer';

const app = new Koa();
const router = new Router();

app.use(cors({
    origin: function (ctx) {
        return "*";
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

router.use('', projectRouter.routes());
app
    .use(router.routes())
    .use(router.allowedMethods());

initSys();

app.listen(5666);
console.log("server listen port: " + 5666);