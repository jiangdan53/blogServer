const express = require('express'); 
const path = require('path'); // 文件解析模块
const logger = require('morgan'); //日志打印中间件
const cors = require('cors')
const {UnkownErr,FobiddenErr,ServiceErr} = require('./utils/errors');
let will = ['null','http://192.168.1.4:8080','http://localhost:9527']//允许放问的地址
// var indexRouter = require('./routes/index'); //路由文件导入
// var usersRouter = require('./routes/users'); //路由文件
var app = express(); //创建一个服务器实例
// 默认读取根目录下的.env环境变量文件
require('dotenv').config() ;
require('./dao/init.js') ;
// 启动redis数据库
require('./dao/redisDB')
app.use(cors({
    origin(o,c){
        if(!o){
            c(null,false)
        }else{
            if(will.includes(o)){
                c(null,o)
            }else{
                c(new Error('you not 百名单'))
            }
        }
           
  },
  credentials:true //携带cookie
}))
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
app.use('/api/res/captcha',require('./routes/captchaRouter'));//验证码
app.use('/api/login',require('./routes/adminRouter'))//后台管理用户登录
app.use('/api/banner',require('./routes/bannerRouter'))// 首页图片展示
app.use('/api/blog',require('./routes/blogRouter'))// blog分类
app.use('/api/blogclass',require('./routes/blogClassRoute'))// 添加文章总类
app.use('/api/article',require('./routes/blogArticleRouter'))// 文章详情
app.use('/api/project',require('./routes/projectReouter'))// 添加一个项目
app.use('/api/comment',require('./routes/commentRouter'))//评论
app.use('/api/message',require('./routes/messageRouter'))//留言板
app.use('/api/seeting',require('./routes/seetingRouter'))//个人信息设置
app.use('/api/commuser',require('./routes/commentUserRouter'))
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
        res.send(new UnkownErr().toResponseJSON())
    }
    console.log(err)
    
});

module.exports = app;
