const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const mongoose = require('./db_mongoose.js');
const sequelize = require('./db_sequelize.js');
const router = require('./router.js');
const cors = require('kcors');

app.use(cors());
app.use(bodyParser());
app.use(router.routes());


const port = 3010;
(async () => {
  try {
    await sequelize.sync(); // Syncronize with the DB for the define tables command
    console.log('connected to db');
    app.listen(port);
    console.log('listening on port', port);
  } catch (e) {
    console.error('error', e);
  }
})();
