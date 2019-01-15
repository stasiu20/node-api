var express = require('express');
var bodyParser = require('body-parser');

var {User, UserSave} = require('./models/user');
var {Todo, todoSave} = require('./models/todo');
const assert = require('assert');

const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
    })
    .post('/todos', (req, res) => {
        todoSave(req.body)
        .then((response) => res.send(response))
        .catch((err) => res.status(400).send(err));
    })
    .get('/todos', (req, res)=>{
        var todos = Todo.find()
            .then((todos) => {
                res.send({todos});
            })
            .catch((err) => {
                res.status(400).send(err);
            })
        
    })
    .listen(port, () => {
        console.log("Started on port 3000");
    });


module.exports = {app};

// UserSave('michal.zoltowski@rrrr.pl', (err, res) => {
//     assert.equal(err, null, `Mamy problem ${JSON.stringify(err, undefined,2)}`);
//     console.log(res);
// });

// todoSave('nowy todo')
// .then((res) => console.log('to jest respons', res))
// .catch((err) => console.log('To jest error', err));

