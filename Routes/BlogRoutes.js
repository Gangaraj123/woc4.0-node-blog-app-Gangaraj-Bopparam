const express = require('express');
const { result } = require('lodash');
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

Router.get('/edit/:id', (req, res) => {
    Blog.findById(new ObjectId(req.params.id))
        .then(result => {
            res.render("../Templates/Basic", { page: 'edit', Blog: result })
        })
})

Router.post('/update/:id', (req, res) => {
    const blog = {
        Title: req.body.Title,
        Body: req.body.Body,
        category: req.body.cat,
    }
    if (req.files)
        blog.img = req.files.myfile;
    Blog.findByIdAndUpdate(new ObjectId(req.params.id), blog)
        .then(result => {
            console.log("Updated blog succesfully");
            res.redirect('/');
        })
})

Router.get('/delete/:id', (req, res) => {
    Blog.findByIdAndDelete(new ObjectId(req.params.id))
        .then
        (
            result => {
                console.log("Delted blog succesfully")
                res.redirect('/');
            }
        )
})
// Route for Creating Blog - filling data
Router.get('/create', (req, res) => {
    res.render('../Templates/Basic', { page: 'create' });
})

// Route for saving blog
Router.post('/create', (req, res) => {
    const newblog = {
        Title: req.body.Title,
        Body: req.body.Body,
        category: req.body.cat,
        img: req.files.myfile
    }

    Blog(newblog).save()
        .then(
            (result) => {
                console.log("Adde new blog succesfully!")
                res.redirect('/')
            }
        )
})

module.exports = Router;