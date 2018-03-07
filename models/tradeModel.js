const mongoose = require('mongoose');

const TradeSchema = mongoose.Schema(
  {    
    equity: String,
    quantity: { type: Number, default: 0 },
    entryPrice: { type: Number, default: 0 },
    entryDate: {type: Date, default: Date.now },
    strategies: String,
    exitPrice: { type: Number, default: 0 },
    exitDate: {type: Date, default: Date.now },
    ATR: { type: Number, default: 0 },
    notes: String,
    status: String,
    title: String,
    marketPrice: { type: Number, default: 0 },
  }
)

// Create a model from our schema
module.exports = mongoose.model('Trade', TradeSchema);
