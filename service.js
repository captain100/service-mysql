const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const { port } = require('./config');
// 数据库连接
const { query, update } = require('./mysql-middle');
// 解析post请求
app.use(bodyParser());

app.use(async ctx => {
    if (ctx.url === '/list') {
        ctx.body = '11111'
    }
    if (ctx.url === '/query') {
        const { hospital } = ctx.request.body;
        const { data } = await query(hospital);
        ctx.body = JSON.stringify(data)
    }

    if (ctx.url === '/updateusername') {
        const { username, userid } = ctx.request.body;
        
        const { results } = await update({username, userid});
        ctx.body = JSON.stringify(results)
    }

    if (ctx.url === '/get' && ctx.method === 'POST') {
        console.log('')
    }
});

app.listen(port, () => console.log(`request post is starting at port ${port}`));