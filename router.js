const Router = require('koa-router');
const equityController = require('./controllers/equityController.js');
const tradeController = require('./controllers/tradeController.js');
router = new Router();

// Nested Routers
router.delete('/delete/id:', tradeController.deleteTrade);
// router.all('/trades/id:', async (ctx, next) => {
//   try {
//     const id = ctx.params.id;
//     console.log('Yeah delete is alive', id);
//     ctx.status = 200;
//     ctx.body = {
//         status: 'success',
//         data: movie
//     };
//   } catch (err) {
//     ctx.status = 400;
//     ctx.body = {
//       status: 'error',
//       message: err.message || 'Sorry, an error has occurred.'
//     };
//   }
// })

router.get('/addEquity', equityController.getAllEquity);
router.post('/addEquity', equityController.postEquity);
router.get('/cards', tradeController.getTrades);
router.delete('/cards/:id', tradeController.deleteTrade);
router.post('/cards', tradeController.postTrade);
// router.get('/', controller.redirect404);

module.exports = router;

