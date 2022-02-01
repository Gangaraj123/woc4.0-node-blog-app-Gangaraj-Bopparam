const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Schema for user
const UserSchema = new Schema({
    name:
    {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// creating Blog model with collection name blogs
const User = mongoose.model('wocuser', UserSchema);

module.exports = User;