const blogClassModel = require('./model/blogClassModel');
const blogtypeMlodel = require('./model/blogTypeModel');
const blogModel = require('./model/blogModel')
exports.addBlogclass = async (obj)=>{
    const count = await blogClassModel.findOne({
        where:{
            blogName:obj.blogName
        }
    })
    if(count){
        return '此类以存在'
    }else{
        return await blogClassModel.create(obj)
    }
}
exports.getBlogOne = async (id)=>{
    return await blogClassModel.findOne({
        where:{
            id:id
        }
    })
}
// 根据总分类获取
exports.getBlogOneClass = async (id)=>{
    // awesblogClas 得到的对象中有一项名字带s的数组(为我们关联模型时模型名字加一个s) 那我们一对多的表中的数据 
    const awesblogClass = await blogClassModel.findAndCountAll({
        where:{
            id:id
        },
        include:blogModel,
    }) 
    return awesblogClass
    //可以将我们这里的数据进行封装 返回给我们的客户端 作为blogType 的渲染数据 
//    console.log(awesblogClass.getblogtypes())
}
exports.getBlogClassAll = async ()=>{
    return await blogClassModel.findAll({
        include:{
            model:blogtypeMlodel,
        }
    })
}