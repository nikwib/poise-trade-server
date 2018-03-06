var yahooFinance = require('yahoo-finance');

exports.getHistoricalQuotes = async (ctx) => {
  const ticker = ctx.params.ticker;
  try {
    const data = await yahooFinance.historical({
      symbol: ticker,
      from: '2018-03-01',
      to: '2018-03-05',
      period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
    }, function (err, quotes) {
      console.log(quotes);
      ctx.status = 200;
      ctx.body = quotes;
    });
  } catch (e) {
    console.log('Error reading Yahoo Finance: ', e);
  }
};

exports.getQuotes = async (ctx) => {
  const ticker = ctx.params.ticker;
  try {
    const data = await yahooFinance.quote({
      symbol: ticker,
      modules: ['price', 'summaryDetail']       // optional; default modules.
    }, function (err, quotes) {
      console.log(quotes);
      ctx.status = 200;
      ctx.body = quotes;
    });
  } catch (e) {
    console.log('Error reading Yahoo Finance: ', e);
  }
};
