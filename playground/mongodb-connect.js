// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');
const assert = require('assert');

//Może tu być url do Heroku
const url = 'mongodb://localhost:27017';

const dbName = 'TodoApp';

// Use connect method to connect to the server
let dbN = () => MongoClient.connect(url, { useNewUrlParser: true }).then((client) => {
  return client.db(dbName);
}).catch((err) => {
  console.log(err);
}); 
  
  // const collection = db.collection('Todos');

  // findByArgs(collection, {done: false}, (err, res) => {
  //   assert.equal(err, null);
  //   console.log(res);
  // });
  // insertDocument(db, (res)=>{
  //   console.log(res);
    
  // });  
//   client.close();
// );

const insertDocument = (db, callback) => {
    const collection = db.collection('Todos');

    collection.insertMany([{ a:1},{b: 2},{c: 3}], (err, result) => {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
};

const findByArgs = (collection, args, callback) => {
  collection.find(args).toArray().then((docs) => {
    callback(undefined,docs);
  }, (err) => {
    callback(err);
  });

}
module.exports.dbN = dbN;