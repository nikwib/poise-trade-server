const Sequelize = require('sequelize');
const loginInfo = require('./loginInfo.js');

const sequelize = new Sequelize(loginInfo.mySqlLogin.database, loginInfo.mySqlLogin.username, loginInfo.mySqlLogin.password, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('DATABASE LOGIN: ',loginInfo.mySqlLogin.database);
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;


