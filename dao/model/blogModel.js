const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect');
const blogtype = require('./blogTypeModel');
const blogClass = require('./blogClassModel');
const mu = require('moment');
module.exports = sequelize.define('blogs',{
    title:{
        type:DataTypes.STRING,
        allwNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allwNull:false
    },
    toc:{
        type:DataTypes.TEXT,
        allwNull:false
    },
    articleClassId:{
        //这是关联blogType的外键
        type:DataTypes.INTEGER,
        allowNull:false
    },
    scanNumber:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    commentNumber:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    createDate:{
        type:DataTypes.STRING,
        allowNull:false,
        get() {
            let val = new Date(+this.getDataValue('createDate')).toLocaleString() === 'Invalid Date' ? new Date(Date.parse(this.getDataValue('createDate'))).toLocaleString() :new Date(+this.getDataValue('createDate')).toLocaleString()
            return val
        },
    },
    recommendNumber:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    classTotal:{
         //这是关联blogClass的外键
        type:DataTypes.INTEGER,
        allowNull:false
    },
    htmlContent:{
        type:DataTypes.TEXT,

    },

},{
    freezeTableName : true,
    createdAt: false,
    updatedAt:false
})