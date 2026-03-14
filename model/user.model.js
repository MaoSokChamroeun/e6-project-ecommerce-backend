const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    role : {
        type : String,
        enum : ['admin' , 'user'],
        required : [true , 'Role are required']
    }
}, {timestamps : true});

const User = mongoose.model('User', userSchema);
module.exports = User;