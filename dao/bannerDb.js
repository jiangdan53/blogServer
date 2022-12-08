const bannerModel = require('./model/bannerModel');
const {existence} = require('../utils/filesExistence')
const {UploadErr} = require('../utils/errors')
// 查询数据库
exports.getBannerAll = async (where = null)=>{
  //查询所有banner区图片的数据
return await bannerModel.findAll( !where ? {} : where) // 在我们更新数据时 需要传入一些参数过滤每一项
}
// 更新(设置数)据库 并检测文件
exports.setBannerContent = async (obj)=>{ 
        //从数据库中获取数据
        const originalArr = await exports.getBannerAll({
            attributes:['Img','id','Title','Description','motto'],
        })
        //更新数据库
        //文件查询系统 确保上传文件且存在 
        //此函数会查询文件是否存在 以及查看数据库内的文件地址 能不能于服务器内的资源一致
        let delteFileArr = await existence(originalArr,obj) 
        // 如果初始的时候 数据库内没有数据则创建 
        if(originalArr.length !== 0){
          // 如果数据内有数据 则根据existence返回的数组对象 中的delete为true则表示需要跟新数据库以及删除上一次上传的文件
          const idArr = originalArr.map(it=>it.id) // 过滤数据库中的id数组
          let arr = [] ; // 创建一个promise数组 
          for(let i = 0; i <idArr.length;i++){ // 循环
            if(delteFileArr[i].updata){ // 因为客户端传入的数组长度决定了 我们文件校验时返回数组的长度 
              arr.push(bannerModel.update(obj[i],{ 
                // sequelize 的实例方法都是异步的promise 这时我们利用一个数组存起来 
                // 使用 promise.all(arr) 方法 得到成功的结果 失败了则返回失败  
                where:{
                    id:idArr[i] //根据id更新数组
                }
              })
              ) 
            }else if(delteFileArr[i].cerate){ // 如果遇到文件检查函数返回数组中 有cerate属性 则代表数据库内的数据不足三条则创建一条数据
                await bannerModel.create(obj[i]) 
            }
          
        }
          let updataOk = await Promise.all(arr) // 得到所有更新数据的结果 返回值类似于[0,1,0,1] 数据更新成功则返回[1] 失败返回0
        if(!parseInt(updataOk.toString().replace(/,/g,''),2)){ // 将010这样的二进制数转化为10进制的数 若都未更改则返回 0
           // 所有数据均于上一次的数据相同 则返回这样的一个对象给客户端 
          return {
              // 更新成功的对象
              success:{
               size: delteFileArr.filter(it=>it.updata || it.delete).length,
               msg: '跟新成功'
              },
                // 不需要更新的对象
              successErr:{
                size:delteFileArr.filter(it=>(!it.delete && it.msg === "资源未变化")).length,
                msg:"资源未变化",
              },
                // 文件上传失败或者 上传文件时地址填写错误的对象 会返回一个id数组 表示未上传成功的图片
              uploadErr:{
                size:delteFileArr.filter(it=>it.msg === '上传文件失败').length,
                msg:'上传文件失败',
                UpErrId:delteFileArr.filter(it=>it.msg === '上传文件失败').map(it=>it.id)
              },
              // 创建数据库成功的对象
              cerate:{
                size:delteFileArr.filter(it=>it.cerate).length,
                msg:'创建成功'
              }
            }
        }
        // 如果有数据跟新了那么就会返回一个类似的对象
        return {
          success:{
            size: delteFileArr.filter(it=>it.updata || it.delete).length,
            msg: '跟新成功'
           },
             // 不需要更新的对象
           successErr:{
             size:delteFileArr.filter(it=>(!it.delete && it.msg === "资源未变化")).length,
             msg:"资源未变化",
           },
             // 文件上传失败或者 上传文件时地址填写错误的对象 会返回一个id数组 表示未上传成功的图片
           uploadErr:{
             size:delteFileArr.filter(it=>it.msg === '上传文件失败').length,
             msg:'上传文件失败',
             UpErrId:delteFileArr.filter(it=>it.msg === '上传文件失败').map(it=>it.id)
           },
           // 创建数据库成功的对象
           cerate:{
             size:delteFileArr.filter(it=>it.cerate).length,
             msg:'创建成功'
           }
        }
        }else{
          //当初始化的时候直接向数据库内添加数据 也会经过上面文件校验系统
          if(!parseInt((delteFileArr.map(it=>{
            if(it===true){
              return 0
            }else{
              return 1
            }
          }).toString().replace(/,/g,'')))){
            return await bannerModel.bulkCreate(obj)  
          }else{
            const arr =  delteFileArr.map(it=>it !== true)
            for(let i = 0 ; i < arr.length;i++){
                throw new arr[i]
            }
            arr = null
          }
        }

  
}