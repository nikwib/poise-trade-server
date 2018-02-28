const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/poise-trader')
  .then(() => { console.log('Connected to db..') })
  .catch(err => { console.log('ERROR connecting to db..') }) 
