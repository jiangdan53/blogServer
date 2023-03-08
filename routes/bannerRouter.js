const express = require('express');
const route = express.Router();
const multer = require('multer')
const path = require('path')
const {asyncHandul} = require('./Middlwaer/setSendResult');
const {getBanner,setBannerContent} = require('../server/bannerServer');
const {UploadErr} = require('../utils/errors')
const {arrayAssemble} = require('../utils/returnArr');
const {unlink} = require('fs')
route.get('/',asyncHandul(async (res,req,next)=>{
    const bannerData = await getBanner()
    return bannerData
}))
// 设置文件上传储存位置信息
const os = multer.diskStorage({
    // 设置文件保存位置
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname,'../public','upload'))
      },
      // 设置上传文件在文件夹中的文件名
      filename: function (req, file, cb) {
        const s = Math.random().toString('32').slice(-6)
        const h = path.extname(file.originalname);
        const sj = Date.now()
        cb(null, `${s}-${sj}${h}`)
      }
});
//生成multer 实例
const upload = multer({
    storage:os,
    limits:{
        fileSize:1024 * 2000
    },
    fileFilter:function (req,file,cd){
        const Rex = /((jpeg)|(png)|(image)|(jpg)|(webp))/
      if(Rex.test(path.extname(file.originalname).toLocaleLowerCase())){
          cd(null,true) 
      }else{
       cd( new UploadErr(`${file.originalname}`))
      }
    }
    })
route.post('/uploadimg',upload.single('image'), asyncHandul( async (res,req,next)=>{
            if(res.body.chengeimg){
                unlink(path.resolve(__dirname,'../public',res.body.chengeimg),(err)=>{
                    console.log(err ? err.path : "删除成功")
                })
            }
    //图片上传成功 返回给客户端 客户端需带上文件名传递给服务器 校验文件是否存在
    //  return arrayAssemble(res.files,'filename','originalname').map(it=>{
        return`\\upload\\${res.file.filename}`
    //  })
    }
))
route.post('/uploadInfo',asyncHandul( async (res,req,next)=>{
    const newArr = res.body.map(it=>{
        return {
            id:it.id,
            Img:it.Img,
            Title:it.Title,
            Description:it.Description, 
            motto:it.motto
        }
    })
       return await setBannerContent(newArr)
 
}))
module.exports = route