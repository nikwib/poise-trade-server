const Trade = require('../models/tradeModel.js');
// const mongoose = require('mongoose');

// const TradeSchema = mongoose.Schema(
//   {    
//     equity: String,
//     quantity: { type: Number, default: 0 },
//     entryPrice: { type: Number, default: 0 },
//     entryDate: {type: Date, default: Date.now },
//     // strategies: [{}],
//     strategies: String,
//     exitPrice: { type: Number, default: 0 },
//     exitDate: {type: Date, default: Date.now },
//     ATR: { type: Number, default: 0 },
//     notes: String,
//   }
// )

// // Create a model from our schema
// const Trade = mongoose.model('Trade', TradeSchema);


exports.getTrades = async (ctx) => {   
  try {
    const trades = await Trade.find(); // Return the resolved promise, store in a constant.
    console.log('Reading data from DB: ',trades);    
    ctx.status = 200;
    ctx.body = trades;
  } catch (e) {
    console.log('Error reading from DB: ',e);
  }
};

exports.deleteTrade = async (ctx) => {
  try{
    console.log(ctx.params);
    const id = ctx.params.id;
    await Topic.findOneAndRemove({
      _id: id
    })
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
    console.error('Error deleting from DB: ',e )
  }
}

exports.postTrade = async (ctx) => {
  try {
    const trade = ctx.request.body;
    console.log('Data Body incoming: ', trade);
    await Trade.create(
      {
        equity: trade.equity,
        quantity: trade.quantity,
        entryPrice: trade.entryPrice,
        entryDate: trade.entryDate,
        strategies: trade.strategies,
        exitPrice: trade.exitPrice,
        exitDate: trade.exitDate,
        ATR: trade.ATR,
        notes: trade.notes,
        status: trade.status,
      })
    ctx.body = trade;
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

