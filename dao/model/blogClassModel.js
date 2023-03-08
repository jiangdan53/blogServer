const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');
module.exports = sequelize.define('blogClass',{
    blogName:{
        type:DataTypes.STRING,
        allwNull:false
    },
    order:{
        type:DataTypes.INTEGER,
        allwNull:false
    },
},{
    freezeTableName : true,
    createdAt: false,
    updatedAt:false
})