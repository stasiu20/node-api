const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb')

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [
    {
        _id: new ObjectId(),
        text: 'Pierwszy todo'
    },{
        _id: new ObjectId(),
        text: 'Drugi todo'
    }];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        Todo.insertMany(todos).then(() => done());
    });
});

describe('POST /todos', ()=>{
    it('should create a new todo', (done) => {
        var content = 'Test z Testu 3';

        request(app)
            .post('/todos')
            .send({text:content})
            .expect(200)
            .expect((res)=> {
                expect(res.body.text).toBe( content);
            })
            .end((err, res) => {
                if(err) {
                   return done(err);
                }
                Todo.find({text:"Test z Testu 3"}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(content);
                    done();
                }).catch((err) => done(err));
            });
    });

    it('should not create a new todo', (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err) {
                   return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err) => done(err));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done)
    });
});

describe('GET /todos/:id', () => {
    it('should get one todo', (done) => {
        var id = todos[0]._id.toHexString(); 
        request(app)
            .get(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.response._id).toBe(id);
            }).end(done);
    });
    
    it('should return 404', (done) => {
        var id = new ObjectId();
        request(app)
            .get(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });

});

describe('DELETE /todos/:id', () => {
    it('should remove one todo', (done) => {
        var id = todos[0]._id.toHexString(); 
        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.response._id).toBe(id);
            }).end(done);
    });
    
    it('should return 404', (done) => {
        var id = new ObjectId();
        request(app)
            .delete(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404', (done) => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });

});