const sequelize = require('../dbConnect');
const {DataTypes} = require('sequelize');
module.exports = sequelize.define('commentUser',{
    userName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    userPwd:{
        type:DataTypes.STRING,
        allowNull:false
    },
    acatar:{
        type:DataTypes.STRING,
        allowNull:false
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false
        }
},
{
    createdAt:false,
    deletedAt:false,
    updatedAt:false
})