const {Sequelize} = require('sequelize') 
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{
    host:process.env.DB_HOST,
    dialect:'mysql',
    logging:false
})
async function tset(){
    try {
        await sequelize.authenticate();
        console.log('数据库链接成功');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }} 
tset()
module.exports = sequelize

