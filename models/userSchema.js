const mongoose   = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type:String, required: true},
    email: {type: String, required: true},
    password:{type: String, required: true}

});

const User = mongoose.model('userInfo', userSchema);

module.exports =User;