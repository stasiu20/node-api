const {dbN} = require('./mongodb-connect');

// console.log(dbN.collection('Todos'));
dbN().then((db)=> {
  var collection = db.collection('Todos');

    // delete meny
    // collection.deleteMany({text: 'do usunięcia'}).then((result)=>{
    //     console.log(result);
    // }).catch((err) => {
    //     console.log(err);
    // });

    //delete one

    // collection.deleteOne({text: 'do usunięcia tylko jeden'}).then((result)=>{
    //     console.log(result);
    // });

    //FindOneAndDelet

    collection.findOneAndDelete({text: 'do usunięcia tylko jeden'}).then((result)=>{
        console.log(result);
    })

    // findByArgs(collection, {done: false}, (err, res) => {
    //     console.log(res);
    //   });
});

  

  const findByArgs = (collection, args, callback) => {
    collection.find(args).toArray().then((docs) => {
      callback(undefined,docs);
    }, (err) => {
      callback(err);
    });
}