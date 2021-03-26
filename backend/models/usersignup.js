const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
    phoneno: {
        type: Number
    },
    gender: {
        type: String
    },
    age: {
        type: Number
    },
    dateofbirth: {
        type: String
    },
    email: { 
        type: String, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String },
    favouritebars:{
        type:[String]
    }
    // profile:{type:String}
});

module.exports = mongoose.model('User', userSchema);