const topicModel = require('../models/topic_model.js');

exports.getTopics = async (ctx) => {   
  try {
    const topics = await topicModel.getTopics(); // Return the resolved promise, store in a constant.
    console.log('Reading data from model: ',topics);
    ctx.body = topics;
  } catch (e) {
    console.log('Error reading from all messages from DB: ',e);
  }
};

exports.postTopic = async (ctx) => {  
  try {    
    const topic = ctx.request.body;
    console.log('Data Body incoming: ',topic);
    await topicModel.postTopic(topic);
    ctx.status = 200;
  } catch (e) {
    ctx.status = 404;
    console.log('INSERT INTO DB ERROR: ',e);
  }
};
