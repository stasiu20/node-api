const {mongoose,Schema} = require('../db/db');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const {ObjectId} = require('mongodb');

var todoSchema = new Schema({
    text: {
        type: String, 
        required: true,
        // unique: true
    },
    done:{
        type: Boolean,
        default: false
    },
    doneAt: {
        type: Date,
        default: null
    },
});

todoSchema.plugin(beautifyUnique);
// var validateEmail = (email) => {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };

var Todo = mongoose.model('Todo', todoSchema);

var todoSave = (content) => { 
        return new Promise((resolve, reject) => {
            Todo.init().then(() => { 
            var todo  = new Todo(content);

            todo.save().then((res)=>{
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        }).catch((err)=>{
            reject(err);
        });
    })
};

var todoFindById = (id) => {
    return new Promise((resolve, reject) => {
        if(!ObjectId.isValid(id)) {
            reject({status:404, text:'Id jest nie poprawne'});
        }

        Todo.findById(id)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject({status:400, text:`Coś poszło nie tak ${err}`});
            });
    });
}

var todoFindByIdAndDelete = (id) => {
    return new Promise((resolve, reject) => {
        if(!ObjectId.isValid(id)) {
            reject({status:404, text:'Id jest nie poprawne'});
        }

        Todo.findByIdAndDelete(id).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject({status:400, text:`Coś poszło nie tak ${err}`});
        })
    });
}

module.exports = {
    Todo,
    todoSave,
    todoFindById,
    todoFindByIdAndDelete
}