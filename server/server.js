const express = require('express');
const bodyParser = require('body-parser');
const _= require('lodash');

var {User, UserSave} = require('./models/user');
var {Todo, todoSave, todoFindById,todoFindByIdAndDelete, todoFindByIdAndUpdate} = require('./models/todo');
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
    .get('/todos/:todosId', (req,res) => {
        
        var todosId = req.params.todosId;

        if(!todosId) {
            res.status(400).send('Musisz podać id');
        }

        todoFindById(todosId)
            .then((todo) => {
                if(!todo) {
                    res.status(404).send('Nie ma użytkownika o takim id');
                }
                res.send({todo});
            })
            .catch((err) => {
                res.status(err.status).send(err.text);
            });

    }).delete('/todos/:todosId', (req, res) => {
        var todosId = req.params.todosId;

        if(!todosId) {
            res.status(404).send('Musisz podać id');
        }

        todoFindByIdAndDelete(todosId)
            .then((todo) => {
                if(!todo) {
                    res.status(404).send('Nie ma todo o takim id');
                }
                res.send({todo});
            })
            .catch((err) => {
                res.status(err.status).send(err.text);
            });
    })
    .patch('/todos/:id', (req, res) => {
        var id = req.params.id;
        var body = _.pick(req.body, ['text', 'done']);

        if(!id) {
            res.status(404).send('Musisz podać id');
        }

        if(_.isBoolean(body.done) && body.done) {
            body.doneAt = new Date().getTime();
        } else {
            body.done = false;
            body.doneAt = null;
        }

        todoFindByIdAndUpdate(id, body)
            .then((todo) => { 
                res.send(todo);
            })
            .catch((err) => {
                res.status(err.status).send(err.text);
            });
    })
    .listen(port, () => {
        console.log(`Started at port ${port}`);
    });


module.exports = {app};

// UserSave('michal.zoltowski@rrrr.pl', (err, res) => {
//     assert.equal(err, null, `Mamy problem ${JSON.stringify(err, undefined,2)}`);
//     console.log(res);
// });

// todoSave('nowy todo')
// .then((res) => console.log('to jest respons', res))
// .catch((err) => console.log('To jest error', err));

