const {getCommentAll,getCommentTitleComment,addcomment,deletecommentOen} = require('../dao/commentDb');
const bolgModel = require('../dao/model/blogModel');
const commentModel = require('../dao/model/commentModel')
const Validate = require('validate.js')
exports.addcommentServer = async (obj)=>{
    // 自定义文章标题是否存在的校验的规则的函数 
    Validate.validators.titleExits = async function(val){
        const s = await bolgModel.findByPk(val);
        if(s){
            // 当查询到有这篇文章则直接放行
            return ;
        }else{
            return 'blog not exits'
        }
    }
    // 自定义用户手机号是否存在的校验规则
    Validate.validators.phoneEixts = async function(vla){
        let p 
        try{
          p =   await commentModel.findOne({
                where:{
                    phone:vla
                }
            })
        }catch(err){
            return 'user not exits'
        }
        if(p && p.phone === val){
            return 
        }else{
            return 'phone not exits'
        }
    }
    // 自定义校验数据的规则 
     const rule = {
        acatar:{
            presence:{ //是否必填
                allowEmpty:false
            },
            type:'string'
        },
        nikename:{
            presence:{
                allowEmpty:false
            },
            type:'string',
            length:{
                miximun:2,
                maximun:8
            }
            
        },
        phone:{
            presence:{
                allowEmpty:false
            },
            numericality:{ 
                onlyInteger:true, //只接收整数
                strict:false // 不允许字符串带空格
            },
            format:/^1([3-9])\d{9}/,
            phoneEixts:true
        },
        title:{
            presence:{
                allowEmpty:false
            },
            type:'string',
            titleExits:true
        },
        content:{
            presence:{
                allowEmpty:false
            },
            type:'string',
        },
        createDate:{
            presence:{
                allowEmpty:false
            },
            type:'string'
        },
        titleId:{
            presence:{
                allowEmpty:false
            },
            type:'number',
            titleExits:true
        }
     }
    await Validate.async(obj,rule) 
    return await addcomment(obj)
}
exports.getCommentAllServer = async function (query){
    // 后台获取所有文章的评论列表
    return await getCommentAll(query)
}
exports.getCommentTitleCommentServer = async function(titleId){
    // 获取当前文章id下的评论列表
    return await getCommentTitleComment(titleId)
}
exports.deletecommentOenServer = async function(phone){
    // 后台删除或者客户端删除自己的品论的接口
    return await deletecommentOen(phone)
}