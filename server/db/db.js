const mongoose = require('mongoose');
const assert = require('assert');



const url = 'mongodb://localhost:27017/TodoApp';

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

var Schema = mongoose.Schema;

mongoose.connect(url, {useNewUrlParser: true});

module.exports = {
    mongoose,
    Schema,
};