// 对于需要token校验的请求的拦截 
const { pathToRegexp } = require("path-to-regexp");
let  {verify} = require('./token')
const {ValidationErr} = require('../../utils/errors');
/**
 * @param {*} methde 需要拦截的请求方式
 * @param {*} path  需要拦截的请求地址
 */ 
let getArr = [
    {methde:'GET',path:'/api/login/whoami'} ,
    {methde:'PUT',path:'/api/login/updataAdmin'},
    {methde:'POST',path:'/api/banner/uploadimg'},
    {methde:'POST',path:'/api/banner/uploadInfo'},
    {methde:'GET',path:'/api/commuser/whoami'}
]
module.exports =  function(res,req,next){ 
    let rex ;
    let newGetArr = getArr.filter(it=>{ 
        rex = pathToRegexp(it.path)  //对于请求地址生成一个正则 
        return it.methde === res.method && rex.test(res.path) // 请求方法于请求地址 是否一致 
    })
    if(newGetArr.length === 0){ //如果不包含需要验证的请求直接放过 进入到下一个中间件 
        next(); 
        return 
    } 
    let token = null;

        verify(res).then((resolve,rej)=>{
            token = resolve
            if(!token) { //token校验失败或者没有token直接拒绝 
                rej('token 为传递')
             }else{
                 res.userId = token.id ;
                 next()
             }
        }).catch(err=>{
          next(new ValidationErr(err)) 

        })
   
   //将我们的请求头传递进入 以便拿到我们的token值 进行token校验 
  
}

