const blogTypeModel = require("./model/blogTypeModel")
const {getBlogOne} = require('./blogClassDb');
const blogModel = require('./model/blogModel');
const blogclass = require('./model/blogClassModel')
exports.addBlogType = async (typeObj)=>{
        const count = await getBlogOne(typeObj.blogId)
        if(count){
            return await blogTypeModel.create(typeObj)
        }else{
            return '总类不存在'
        }
}
exports.getblogTypeOne = async (typename)=>{
    return await blogTypeModel.findOne({
        where:{
            name:typename
        },
    })
}
exports.deleteBlogType = async (id)=>{
    //删除一个分类 按照id删除博客表类对应的文章  describe({where:{artliceClassId:1}})

}

  