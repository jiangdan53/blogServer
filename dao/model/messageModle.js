const sequelize = require('../dbConnect');
const {DataTypes} = require('sequelize');
module.exports = sequelize.define('message',{
    nikemame:{
        type:DataTypes.STRING,
        allowNull:false
    },
    avatar:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    cerateDate:{
        type:DataTypes.STRING,
        allowNull:false
    },

},{
    freezeTableName : true,
    createdAt: false,
    updatedAt:false
})