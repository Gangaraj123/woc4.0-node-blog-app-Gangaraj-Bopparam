const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    user: { // adding a user for a blog
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    author:{
        type:String,
        required:false
    },
    Title: {
        type: String,
        required: true
    },
    Body:
    {
        type: String,
        required: true
    },
    category:
    {
        type: String,
        default: "General"
    }
    , img: {
        data: Buffer,
        contentType: String
    }
    ,
    date: { type: Date, default: Date.now },
})

// creating Blog model with collection name blogs
const Blog = mongoose.model('testBlogs', BlogSchema);

module.exports = Blog;