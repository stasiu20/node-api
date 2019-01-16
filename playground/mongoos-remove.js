const {mongoose} = require('./../server/db/db');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {MongoClient, ObjectID} = require('mongodb');

var id = '5c3f2d08301ed20034a63296';
// Todo.remove({})

//Todo.findOneAndRemove

//Todo.findOneAndDelete({'_id': id}).then((res) => console.log(res));

//Todo.findByIdAndRemove


Todo.findByIdAndDelete(id)
.then((res) => {
    console.log(res);
})
.catch((err) => console.log(err));