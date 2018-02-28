'use strict';
const equityModel = require('../models/equityModel.js');
// const Sequelize = require('sequelize');
// const sequelize = require('../db_sequelize');

// const equityModel = sequelize.define('equity', {
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false
//   },
//   ticker: {
//     type: Sequelize.STRING(10),
//     allowNull: false
//   },
//   size: {
//     type: Sequelize.STRING(10),
//     allowNull: false
//   }
// });

exports.getAllEquity = async (ctx) => {   
  try {
    const data = await equityModel.findAll(); // Return the resolved promise, store in a constant.
    console.log('Reading data from model: ',data);
    ctx.body = data;
  } catch (e) {
    console.error('Error reading from DB: ',e);
  }
};

exports.postEquity = async (ctx) => {  
  try {
    const data = ctx.request.body;
    console.log('Data Body incoming: ',data);
    await equityModel.create({
            name: data.name,
            ticker: data.ticker,
            size: data.size
          });  
    ctx.status = 200;
  } catch (e) {
    ctx.status = 404;
    console.error('Error writing to DB: ',e);
  }
};

// exports.redirect404 = ctx => ctx.redirect('404');
