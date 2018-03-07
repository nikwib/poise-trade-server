require('chai').should();
const sinon = require('sinon');
const request = require('request');

const YahooApiController = require('./../controllers/yahooApiController');
const { quote } = require('./mocks')
const baseUrl = 'http://localhost:3010';

const yahooFinance = require('yahoo-finance');
yahooFinance.quote = sinon.stub().returns(quote);
yahooApiController = new YahooApiController(yahooFinance);

const ctx = {params: {ticker: 'GOOG'}};
const nonTickerCtx = {params: {ticker: ''}};

describe('Yahoo API controller', () => {
  it('should respond from fetch', async () => {  
    await yahooApiController.getQuotes(ctx)
    ctx.body.should.equal(quote);
    ctx.status.should.equal(200);
  });

  it('should throw an error when no ticker provided', async () => {  
    await yahooApiController.getQuotes(nonTickerCtx)
    ctx.body.should.eql({
      error: "Ticker not provided"
    });
    ctx.status.should.equal(400);
  });

  it('should throw an error when ticker does not exist');
  
})


// describe('Quote', () => {
//   it('should respond from fetch', (done) => {
//     request.get(baseUrl +'/quotes/goog', (err, res, body) => {
//       // there should be a 200 status code
//       res.statusCode.should.eql(200);
//       // the response should be JSON
//       res.headers['content-type'].should.contain('application/json');
//       // parse response body
//       body = JSON.parse(body);
//       body.should.equal(quote);
//       done();
//     });
//     // const respond = await yahooApiController.getQuotes('GOOG');
//     // respond.should.equal(quote);
//   })

// })

// const sinon = require('sinon');
// const yahoo = require('yahoo');

// yahoo.getStocks = sinon.stub().returns({
//   …
// })

// describe('stocks',  () => {
//   if('process stocks', async (done)=>{
//     const stocks = new Stocks(yahoo);
//     const ret = await getStocks();
//     ret.should.eql({
//       'date':[],
//       'date1':[]
//     });

//   })
// })

// // =====================================


// const yahoo = require('yahoo');

// class Stocks {
//   constructor(injectedYahoo) {
//     this.yahoo = injectedYahoo ? injectedYahoo : yahoo;
//   }

//   getStocks = async () => {
//     const rawData = await yahoo.getStocks('TWTR');
//     return rawData.reducte((accum, tick) => {
//       if(accum[tick.date]) {
//         accum[tick.date].push(tick)
//       }else {
//         accum[tick.date] = [tick]
//       }
//     }, {})
//   }
// }
