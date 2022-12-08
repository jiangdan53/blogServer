const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');
module.exports = sequelize.define('blotype',{
    name:{
        type:DataTypes.STRING,
        allwNull:false
    },
    order:{
        type:DataTypes.INTEGER,
        allwNull:false
    },
    articleCount:{
        type:DataTypes.INTEGER,
        allwNull:false
    },
    blogId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    freezeTableName : true,
    createdAt: false,
    updatedAt:false
})