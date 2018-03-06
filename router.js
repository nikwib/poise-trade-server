const Router = require('koa-router');
const equityController = require('./controllers/equityController.js');
const tradeController = require('./controllers/tradeController.js');
const yahooApiController =require('./controllers/yahooApiController.js')
router = new Router();

router.get('/addEquity', equityController.getAllEquity);
router.post('/addEquity', equityController.postEquity);
router.delete('/delete/id:', tradeController.deleteTrade);
router.get('/cards', tradeController.getTrades);
router.put('/cards', tradeController.updateTrade);
router.delete('/cards/:id', tradeController.deleteTrade);
router.post('/cards', tradeController.postTrade);

router.get('/quotes/:ticker', yahooApiController.getQuotes);

// router.get('/', controller.redirect404);

module.exports = router;

