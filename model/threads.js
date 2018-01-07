'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var ThreadsSchema = new Schema({
    lastUpdate: String,
    id: String,
    title: String,
    text: String
});

//export module to use in server.js
module.exports = mongoose.model('Thread', ThreadsSchema);
