const express = require('express');
const { ObjectId } = require('mongodb');
const Router = express.Router();
const Blog = require('../Models/Blog')

// Route for viewing individual blogs
Router.get('/view/:id', (req, res) => {
    Blog.findById(new ObjectId(req.params.id))
        .then
        (result => {
            res.render("../Templates/Basic", { page: 'showblog', bg: result })
        })
})

// Route for Creating Blog - filling data
Router.get('/create', (req, res) => {
    res.render('../Templates/Basic', { page: 'create' });
})

// Route for saving blog
Router.post('/create', (req, res) => {

    const newblog = Blog(req.body)
    newblog.save()
        .then(
            (result) => {
                console.log("Adde new blog succesfully!")
                res.redirect('/')
            }
        )
})
module.exports = Router;