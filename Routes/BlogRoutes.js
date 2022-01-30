const express = require('express');
 const { ObjectId } = require('mongodb');
const Router = express.Router();
const Blog = require('../Models/Blog');
const Comment = require('../Models/Comment');

// Route for viewing individual blogs
Router.get('/view/:id', (req, res) => {
    Blog.findById(new ObjectId(req.params.id))
        .then
        (result => {
            res.render("../Templates/Basic", { page: 'showblog', bg: result })
        })
})

Router.get('/yourblogs/:id',(req,res)=>{
    Blog.find()
    .then(
        result=>{
            const blogs=[];
            result.forEach(el=>{
                if(el.user.toString()===req.params.id.toString())
                blogs.push(el);
            })
            res.render('../Templates/Basic',{page:'yourblogs',blogs:blogs})
        }
    )
})
// router for editing blog
Router.get('/edit/:id', (req, res) => {
    Blog.findById(new ObjectId(req.params.id))
        .then(result => {
            res.render("../Templates/Basic", { page: 'edit', Blog: result })
        })
})

// router for updating blog
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

// router for deleting blog
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
        user: req.body.id,
        author:req.body.author,
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

Router.post('/addcomment',(req,res)=>{
    const newcmt={
        user:req.body.user,
        username:req.body.username,
        body:req.body.body,
        Blog:req.body.Blog
    }
    Comment(newcmt).save()
    .then(
        (result=>{
            console.log('added new comment successfully\n');
            res.json({})
        })
    )
})

Router.post('/getcomments',(req,res)=>
{
    Comment.find({Blog:req.body.Blog})
    .then(
        result=>{
            res.json({comments:result})
        }
    )
})
module.exports = Router;