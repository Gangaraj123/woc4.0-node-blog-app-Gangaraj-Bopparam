const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
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
    ,
    date: { type: Date, default: Date.now },
})

// creating Blog model with collection name blogs
const Blog = mongoose.model('MyBlogs', BlogSchema);

module.exports = Blog;