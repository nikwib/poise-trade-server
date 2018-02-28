'use strict';
// const mongoose = require('../db.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/chatDb');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("we're connected to DB!");
});

// Schema is creating the table ref
var topicSchema = mongoose.Schema({
  title: String,
  date:  Date,
  score: Number
});
// Create a model from our schema
var Topic = mongoose.model('Topic', topicSchema);

exports.getTopics = function () {
  return new Promise((resolve, reject) => {
  // Get all document from model (DB)
    Topic.find(function (err, topic) {
      if (err) return console.error(err);
      console.log('Get Messages: ',topic); 
      resolve(topic);
     })
  });
};

exports.postTopic = function (topic) {
  console.log('Message context body: ',topic);
  // No need to return a promise since the save method returns a promise.
  return new Promise((resolve, reject) => {
  // create a document/record based on our schema
    const doc = new Topic({
     title: topic.title,
     date: topic.date,    
     score: topic.score
    });
    // Save our document in the database
    doc.save(function (err, doc) {
      if (err) return console.error(err);
      console.log('Data saved to mongoose DB');
      resolve(doc);
    });
  });
};

 


