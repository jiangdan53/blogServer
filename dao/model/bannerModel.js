const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect'); //sequelize链接成功的实例对象 
module.exports = sequelize.define('banner',{
    Img:{
     type:DataTypes.STRING,
    allwNull:false
    },
    Title:{
        type:DataTypes.STRING,
        allwNull:false
    },
    Description:{
        type:DataTypes.STRING,
        allwNull:false
    },
    motto:{
        type:DataTypes.STRING,
        allwNull:false
    }
},
{
    freezeTableName : true, //创建的表不带s后缀
    createdAt: false, //创建的表不带创建时间
    updatedAt:false // 创建的表不带修改时间
})