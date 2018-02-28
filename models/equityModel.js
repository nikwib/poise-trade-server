'use strict';
const Sequelize = require('sequelize');
const sequelize = require('../db_sequelize');

 const equityModel = sequelize.define('equity', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ticker: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  size: {
    type: Sequelize.STRING(10),
    allowNull: false
  }
});

module.exports = equityModel;
