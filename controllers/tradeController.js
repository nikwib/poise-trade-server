const Trade = require('../models/tradeModel.js');

exports.getTrades = async (ctx) => {
  try {
    const trades = await Trade.find(); // Return the resolved promise, store in a constant.
    // console.log('Reading data from DB: ', trades);
    ctx.status = 200;
    ctx.body = trades;
  } catch (e) {
    console.log('Error reading from DB: ', e);
  }
};

exports.updateTrade = async (ctx) => {
  try {
    const tradeData = ctx.request.body;
    console.log('trade to update: ', tradeData)
    const trade = await Trade.findOneAndUpdate({ _id: tradeData._id }, { ...tradeData })
    ctx.status = 200;
    ctx.body = trade;
  } catch (e) {
    ctx.status = 503;
    ctx.body = { 
      status: 'Service Unavailable, error updating DB' , 
      message: e }
  };
};


exports.deleteTrade = async (ctx) => {
  try {
    const id = ctx.params.id;
    await Trade.findOneAndRemove({ _id: id })
    ctx.status = 200;
    ctx.body = {
      status: 'success'
    };
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
    console.error('Error deleting from DB: ', e)
  }
}

exports.postTrade = async (ctx) => {
  try {
    const tradeData = ctx.request.body;
    console.log('Data Body incoming: ', tradeData);    
    const trade = await Trade.create(
      {
        equity: tradeData.equity,
        quantity: tradeData.quantity,
        entryPrice: tradeData.entryPrice,
        entryDate: tradeData.entryDate,
        strategies: tradeData.strategies,
        exitPrice: tradeData.exitPrice,
        exitDate: tradeData.exitDate,
        ATR: tradeData.ATR,
        notes: tradeData.notes,
        status: tradeData.status,
      });
    ctx.body = trade;
    console.log('Inserted to DB after post', trade);
    // await ctx.response.json(trade)
    // .then(trade => {res.json(trade)})
    // .then(() => ctx.status = 200)
    // await msgModel.insertIntoDb(trade);
    ctx.status = 200
  } catch (e) {
    ctx.status = 404;
    console.log('INSERT INTO DB ERROR: ', e);
  }
};

