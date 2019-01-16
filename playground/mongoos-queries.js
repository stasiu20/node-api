const {mongoose} = require('./../server/db/db');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {MongoClient, ObjectID} = require('mongodb');
const {ObjectId} = require('mongodb');

var id = '5c3ddec4f7a001b0d8c97b3f';
var userId = '5c3c6b5e56aada0013010778';

if(!ObjectId.isValid(id)) {
    console.log('ID not valid');
}

if(!ObjectId.isValid(userId)) {
    console.log('ID not valid');
}


// Todo.find({
//     _id: id
// })
// .then((todos) => {
//     console.log('Todos', todos);
// })
// .catch((err) => console.log(err));

// Todo.findOne({
//     _id: id
// })
// .then((todo)=>{
// console.log('Todo', todo);
// })
// .catch((err)=> console.log(err));

// Todo.findById(id).then((todo)=> {
//     if(!todo) {
//         return console.log('There is no todo');
//     }
//     console.log('To do from id', todo)
// }).catch((err) => {
//     console.log(err);
// })

User.findById(userId)
    .then((user) => {
        if(!user) {
          return console.log('There is no Users');
        }
        console.log(user);
    }, (err) => {
        console.log(err);
    })
