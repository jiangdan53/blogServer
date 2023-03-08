const allowOrigin = ['null'];
module.exports = function({headers,method},{header},next){
     //处理预检请求
     if(method === "OPTIONS"){
        //处理预检请求并给浏览器返回我们同意这个请亲 并设置同意请求的方式
        header(
            "Access-Control-Allow-Methods",headers['acces-control-request-method']
        )
        // 设置同意请求的请求头
        header(
            "Access-Control-Allow-Headers",headers['access-control-request-hesders']
        )
        // 表示我们同意带token的需要身份凭证的请求 如果设置这个那么浏览器拿到旧表示后端接口就拒绝带身份凭证的请求
        header('Access-Control-Allow-Credentials',true)
     }
     if('origin' in headers  && allowOrigin.includes(headers.origin)){
        // 不管时简单请求还是复杂请求都需要将我们允许访问的源地址 返回给浏览器 否则浏览器将拒绝客户端发出的请求
        header('access-control-allow-origin',headers.origin);
        next()
     }
}