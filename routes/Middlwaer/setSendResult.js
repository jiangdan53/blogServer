
exports.setData = function(data,msg,code){
    return {
        code,
        msg,
        data
    }
}
exports.asyncHandul =  function(handler){
 return async (res,req,next)=>{
    const resData = [
        {meth:'get',path:'/api/banner'}
    ]
    try{
        const data = await handler(res,req,next);
        if(data){
            return req.send(exports.setData(data,'ok',200))
        }
    }catch (err){
        next(err)
    }
       
        
 }
}