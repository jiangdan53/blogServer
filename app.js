var express = require('express'); 
var path = require('path'); // 文件解析模块
var logger = require('morgan'); //日志打印中间件
const {UnkownErr,FobiddenErr,ServiceErr} = require('./utils/errors')
// var indexRouter = require('./routes/index'); //路由文件导入
// var usersRouter = require('./routes/users'); //路由文件
var app = express(); //创建一个服务器实例
// 默认读取根目录下的.env环境变量文件
const mu = require('moment')
console.log(mu('2020-12-05 21:24').utc().format('x'))
console.log(mu(1607174640000).format('YYYY-MM-DD HH:mm:ss'))
require('dotenv').config() ;
require('./dao/init.js') ;
// 没次服务器重新启动都会清空内存 然后释放调我们存储的session数据
app.use(require('express-session')({
    secret:process.env.SESSION_SEECR, //设置session密钥
    resave:true, // 强制保存 即使当前数据并没有发生变化
    saveUninitialized:true, // 在创建初期 即使没有初始化也要强制保存 
    cookie:{
       maxAge: 60000
    }
}))
app.use(require('./server/Middlwaer/getTokenMiddlwaer'))
app.use(logger('dev')); // 使用日志中间件
app.use(express.json()); // 
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); //静态资源目录
//使用路由中间件
app.use('/api/res/captcha',require('./routes/captchaRouter'));
app.use('/api/login',require('./routes/adminRouter'))
app.use('/api/banner',require('./routes/bannerRouter'))
app.use('/api/blog',require('./routes/blogRouter'))
app.use('/api/blogclass',require('./routes/blogClassRoute'))
app.use('/api/article',require('./routes/blogArticleRouter'))
// 错误处理(边界处理)
// app.use(function(req, res, next) {
//   next(createError(404));
// });
// error handler
// 错误处理
app.use(function(err, req, res, next) {
    if(err.name === '406'){
        res.send(new FobiddenErr('未登录，或登录以过期').toResponseJSON())
    }else if(err instanceof ServiceErr){
        res.send(err.toResponseJSON())
    }
    else{
        console.log(err,'000000')
        res.send(new UnkownErr().toResponseJSON())
    }
    
});

module.exports = app;
