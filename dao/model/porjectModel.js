const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');
//定义数据模型
module.exports  = sequelize.define('project',{
    description:{
        type:DataTypes.TEXT,
        allwNull:false
    },
    github:{
        type:DataTypes.STRING,
        allwNull:false
    },
    name:{
        type:DataTypes.STRING,
        allwNull:false,
    },
    order:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    thumb:{
        type:DataTypes.STRING,
        allowNull:false
    },
    url:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    freezeTableName : true,
    createdAt: false,
    updatedAt:false
});
