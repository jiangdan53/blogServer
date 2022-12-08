const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');
//定义数据模型
module.exports  = sequelize.define('admin',{
    loginId:{
        type:DataTypes.STRING,
        allwNull:false,
        get(){
            const val = this.getDataValue('loginId')
            return val ? val : 'not fnuc'
        }
    },
    loginPwd:{
        type:DataTypes.STRING,
        allwNull:false
    },
    userName:{
        type:DataTypes.STRING,
        allwNull:false,
        get(){
            const val = this.getDataValue('userName')
            return val ? val : 'not fnuc'
        }
       
    }
},{
    freezeTableName : true,
    createdAt: false,
    updatedAt:false
});
