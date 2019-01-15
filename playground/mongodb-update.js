const {dbN,ObjectID} = require('./mongodb-connect');
dbN().then((db)=> {
  var collection = db.collection('Users');

  collection.findOneAndUpdate({_id: new ObjectID('5c3b53a4301ed20034a051c8')}, 
  {
    $set: {name: 'Michał Żółtowski'}, 
    $inc: {age: 1}
  },{returnOrginal: false, returnNewDocument: true}).then((result)=>{
    console.log(result);
  });
});
