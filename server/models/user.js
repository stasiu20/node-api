const {mongoose,Schema} = require('../db/db');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1
}
});


userSchema.path('email').validate((v)=> {
    var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailPattern.test(v);
         
}, (props) => `${props.value} is not a valid email!`);

userSchema.plugin(beautifyUnique);

var User = mongoose.model('User', userSchema);


var UserSave = (email, callback) => { User.init().then(() => { 
    var user  = new User({email: email});

    user.save().then((res)=>{
        callback(undefined,res);
    }).catch((err) => {
        callback(err.errors);
    });
}).catch((err)=>{
    callback(err);
});
};

module.exports = {
    User,
    UserSave
}