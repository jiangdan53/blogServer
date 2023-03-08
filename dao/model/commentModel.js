const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');
//定义数据模型
module.exports  = sequelize.define('comment',{
    acatar:{
        type:DataTypes.STRING,
        allwNull:false
    },
    nikename:{
        type:DataTypes.STRING,
        allwNull:false
    },
    phone:{
      type:DataTypes.INTEGER,
      allowNull:false  
    },
    title:{
        type:DataTypes.STRING,
        allwNull:false,
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    createDate:{
        type:DataTypes.STRING,
        allowNull:false
    },
    titleId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
},{
    freezeTableName : true,
    createdAt: false,
    updatedAt:false
});
