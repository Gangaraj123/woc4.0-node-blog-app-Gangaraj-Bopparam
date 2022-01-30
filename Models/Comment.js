const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: { // adding a user for a blog
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    username:{
        type:String,
        required:true,
    },
    Blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    },
    body:{
        type:String,
        required:true
    },
    date: { type: Date, default: Date.now },
})

// creating Blog model with collection name blogs
const Comment = mongoose.model('comments', CommentSchema);

module.exports = Comment;