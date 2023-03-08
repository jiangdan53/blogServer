const express = require('express');
const {addAdminServer,loginServer,updataAdminServer,whomiServer} = require('../server/adminServer')
const {pudToken} = require('../server/Middlwaer/token');
const {asyncHandul} = require('./Middlwaer/setSendResult')
const {ValidationErr} = require('../utils/errors')
const route = express.Router();
route.post('/',asyncHandul(async ({body,session},req,next)=>{
   // hasOwnProperty 表示查看对象中是否具有某个属性 不会查找原型链 只看对象自身不查找继承
   //// 每次服务器重新启动都会清空内存 然后释放调我们存储的session数据
   // console.log(body.captcha  && session.captchaText , body.captcha.toLowerCase() === session.captchaText.toLowerCase(),session,body)
   if(body.captcha  && session.captchaText  && body.captcha.toLowerCase() === session.captchaText.toLowerCase()){
         // 当客户端传来验证码并且session保存了验证码 同时验证码一致 代表登录成功
      let user = await loginServer({loginId:body.loginId,loginPwd:body.loginPwd})
      if(body.checked && user){
         let val = user.loginId  && user.loginId;
         pudToken(req,body.remember,{id:val.toString()});
      }
      return user
   
   }else if(!body.captcha ){
      throw new ValidationErr('未入验证码')
   }else if(!session.captchaText){
      throw new ValidationErr('验证码过期')
   }else {
      throw new ValidationErr('验证码错误')
   }
   
})) 
route.post('/addadmin',asyncHandul(async({body})=>{
return await addAdminServer(body)
}))
route.get('/whoami', asyncHandul(async ({userId},req,next)=>{ 
  return await whomiServer(userId)
}))
route.put('/updataAdmin',asyncHandul( async ({body})=>{
   return await updataAdminServer(body)
}))
module.exports = route