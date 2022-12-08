const {stat,unlink} = require('fs');
const {promisify} = require('util');
const {UploadErr} = require('../utils/errors');
const {Texistence} = require('../utils/txetExistence')
const path = require('path')
exports.urlFile = async (url)=>{
    try{
        const isexist = await promisify(stat)(path.join(__dirname,'../public',url)) 
        return isexist.isFile()
    }catch(err){
       return false
    }
}
/**
 * 
 * @param {Array} sqArr  数据库内的数据 
 * @param {Array} clientArr  客户端传递的数据
 * @returns  返回值为数组
 */
exports.existence = async (sqArr,clientArr)=>{
    let isokArr = []
    /**
     * 验证文件是否存在
     * @param {*} url    需要验证的文件地址
     * @returns  返回Boolean值
     */
    // 当数据库内的数据量和客户端传递的数据量不一样时 
    // 如果数据库内的数据量低于客户端传递的数据量 则循环取客户端数据的长度
    // 如果数据库内的数据量高于或等于数据库内的数据量则 取数据库数据的长度
    for(let i = 0; i < (sqArr.length >= clientArr.length ? sqArr.length :  clientArr.length ); i++){
        if(sqArr.length === 0){ 
            // 数据库没数据时 进入次循环
            if(clientArr[i].hasOwnProperty('Img') && await exports.urlFile(clientArr[i].Img)){
                // 当数据库内还没有数据时 我们需要重新创建数据库数据 返回true 代表需要从新创建数据
                isokArr.push(
                    new Promise((res,rej)=>{
                        res(true)
                    })
                )
            }else if(clientArr[i] && clientArr[i].hasOwnProperty('originalname')){
              // 客户端给的数据不正确  服务器内没有找到相应的文件 
                rej( UploadErr(`文件${clientArr[i].originalname}未在服务器找到`) )
            }else{
                // 客户端给的数据不正确时 服务器内没有文件且该对象还没有其他属性
                rej( UploadErr('文件未上传成功'))
            }
        }else{
            // 数据库有数据 进入这个逻辑
            isokArr.push(new Promise(async (res,rej)=>{
                if((await exports.urlFile(clientArr[i].Img) && await exports.urlFile(sqArr[i].Img)) && sqArr[i].Img === clientArr[i].Img){
                    // 数据库内的数据条数于客户端一致 则进入这里 判断上传的数据是否于上次上传的文件地址相同
                    // 未更新服务器内的文件 也就是图片未改变 且同名文件无法写入到服务器
                    if(parseInt(Texistence(sqArr[i],clientArr[i]).toString().replace(/,/g,''),2) === 0){
                            res({id:sqArr[i].id,delete:false,updata:true,msg:'变化了'})
                    }else{
                        res({id:sqArr[i].id,delete:false,updata:false,msg:'资源未变化'})
                    }
                    return 
                    
                }else if(sqArr[i]){
                    // 数据内的数据条数于客户端的数据条数 必须一致 
                    // 上传了新的图片
                    if(await exports.urlFile(clientArr[i].Img) && await exports.urlFile(sqArr[i].Img)){
                        // 客户端上传的文件 和服务器内的文件必须都存在
                        if(sqArr[i].Img !== clientArr[i].Img ){
                            // 两个文件的服务器地址不能相同
                            // 当用户将图片位置改变(传递的数据id是不能变的) 所以当对应位置的图片地址不同
                            // 则查询传递的参数中是否有符合条件的图片地址 如果有则跟新数据库就行了
                            // 而数据库中的数据属于是上一次的 这次的数据是更新的 所以需要跟新数据库 
                            const containsize = clientArr.filter(it=>it.Img === sqArr[i].Img);
                            if(sqArr[i].Img  === containsize.length > 0 && containsize[0].Img){
                                rej({id:sqArr[i].id,delete:false,updata:true,msg:'地址改变 文件未新增'})
                            }else{
                                res({id:sqArr[i].id,delete:true,updata:true,msg:'需要删除本地文件'})
                            }
                        }
                        // 图片上传成功了 且本地文件和上传文件同时存在 需要删除本地文件 
                      }else if(!await exports.urlFile(clientArr[i].Img) && await exports.urlFile(sqArr[i].Img)){
                        // 上传文件不存在 无需删除服务器文件
                        rej({id:sqArr[i].id,delete:false,updata:false,msg:'上传文件失败'})
                      }else if(await exports.urlFile(clientArr[i].Img) &&  !await exports.urlFile(sqArr[i].Img)){
                        // 本地文件不存在 且服务器文件上传成功 也无需删除本地文件 
                        rej({id:sqArr[i].id,delete:false,updata:true,msg:'本地文件不存在 创建一条数据'})
                      }else{
                        rej({id:sqArr[i].id,delete:false,updata:false,msg:'上传文件失败'})
                        // rej(new UploadErr('文件未上传成功'));
                      }
                }else{
                    //当客户端上传的数据条数超出了 服务器端的数据条数 则进入此逻辑判断
                    if(clientArr[i].hasOwnProperty('Img') && await exports.urlFile(clientArr[i].Img)){
                        //客户端上传的数据有Img属性 且属性代表的地址内在服务器内找到资源 则返回当前数据
                        res({id:i,delete:false,cerate:true,msg:'需要向数据库添加一个数据'});
                    }else{
                        // 当服务器资源不存在 且数据不带有Img属性 则抛出错误
                        rej(new UploadErr('文件未上传成功'));
                    }
                }
            }))
        }
      
    }
    let  promisrArr = await Promise.allSettled(isokArr)
        // 过滤数组 留下值 去掉Promise的status状态
         promisrArr =  promisrArr.map(it=>{
        if(it.status === 'fulfilled'){
            // fulfilled 时res返回的数据在value中
            return it.value
        }else{
            //为reject时返回的数据在reason
            return it.reason
        }
    })
     //校验其他信息 
     
    // 删除旧图片
    for(let i = 0; i < promisrArr.length; i++){
        if(promisrArr[i].delete){
            unlink(path.join(__dirname,'../public',sqArr.filter(it=>{
                return it.id === promisrArr[i].id
            })[0].Img),(err)=>{
                console.log(err ?'删除失败' :'删除成功')
            })
        }
    }
    return promisrArr //将结果返回
}