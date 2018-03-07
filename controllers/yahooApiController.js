const yahooFinance = require('yahoo-finance');
const Trade = require('../models/tradeModel.js');

class YahooApiController {
  constructor(injectedYahooFinance) {
    //this.yahooFinance = injectedYahooFinance ? injectedYahooFinance : yahooFinance;
    this.yahooFinance = injectedYahooFinance ? injectedYahooFinance : yahooFinance;
    this.getQuotes = this.getQuotes.bind(this)
  };

  //getQuotes = async (ctx) => {
  async getQuotes(ctx) {
    const ticker = ctx.params.ticker;
    try {
      const quote = await this.yahooFinance.quote({
        symbol: ticker,
        modules: ['price', 'summaryDetail']
      });
      const trade = await Trade.findOneAndUpdate({ equity: ticker }, 
        { title:quote.price.shortName, 
          marketPrice: quote.price.regularMarketPrice 
        });
      ctx.status = 200;
      ctx.body = quote;
      // console.log('DATA : ',quote);
    } catch (e) {
      ctx.status = 400;
      ctx.body = 'Error reading Yahoo Finance: ';
      // console.log('Error reading Yahoo Finance: ', e);
    }
  };

  // // getHistoricalQuotes = async (ctx) => {
  // async getHistoricalQuotes(ctx) {
  //   const ticker = ctx.params.ticker;
  //   try {
  //     const data = await yahooFinance.historical({
  //       symbol: ticker,
  //       from: '2018-03-01',
  //       to: '2018-03-05',
  //       period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
  //     }, function (err, quotes) {
  //       console.log(quotes);
  //       ctx.status = 200;
  //       ctx.body = quotes;
  //     });
  //   } catch (e) {
  //     ctx.status = 400;
  //     ctx.body = 'Error reading Yahoo Finance: ';
  //     console.log('Error reading Yahoo Finance: ', e);
  //   }
  // };
};
module.exports = YahooApiController;
