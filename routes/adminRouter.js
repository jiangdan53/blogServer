const express = require('express');
const adminServer = require('../server/adminServer')
const {pudToken} = require('../server/Middlwaer/token');
const {asyncHandul} = require('./Middlwaer/setSendResult')
const {ValidationErr} = require('../utils/errors')
const route = express.Router();
route.post('/',asyncHandul(async (res,req,next)=>{
   // hasOwnProperty 表示查看对象中是否具有某个属性 不会查找原型链 只看对象自身不查找继承
   //// 每次服务器重新启动都会清空内存 然后释放调我们存储的session数据
   if(res.body.captcha  && res.session.captchaText  && res.body.captcha.toLowerCase() === res.session.captchaText.toLowerCase()){
         // 当客户端传来验证码并且session保存了验证码 同时验证码一致 代表登录成功
      let user = await adminServer.login({loginId:res.body.loginId,loginPwd:res.body.loginPwd})
      if(user){
         let val = user.loginId  && user.loginId;
         pudToken(req,7,{id:val.toString()});
      }
      return user
   
   }else if(!res.body.captcha ){
      throw new ValidationErr('未入验证码')
   }else if(!res.session.captchaText){
      throw new ValidationErr('验证码过期')
   }else {
      throw new ValidationErr('验证码错误')
   }
   
})) 
route.get('/whoami', asyncHandul(async (res,req,next)=>{ 
  return await adminServer.whomi(res.userId)
}))
route.put('/updataAdmin',asyncHandul( async (res,req,next)=>{
   return await adminServer.updataAdmin(res.body)
}))
module.exports = route