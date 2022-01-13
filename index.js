// index.js, starting point of the app

const express = require('express'); // importing express
const path = require('path')
const Blog = require('./Models/Blog');
const ConnectToMongoose = require('./Models/db');
const app = express(); // creating an instance of express

ConnectToMongoose(app);// connecting to db
app.set('view engine', 'ejs'); // registering view engine
app.use(express.urlencoded({ extended: true })); //middle ware to get the data submitted by forms
app.use('/blog', require("./Routes/BlogRoutes")); //middlware for blog route
app.use(express.static(path.join(__dirname, 'Components'))) // using Components folder as static

//HOme page
app.get('/', (req, res) => {
    Blog.find()
        .then(result => {
            res.render('../Templates/basic', { page: "Home", Curr_blogs: result.reverse() })
        })
})

app.get('/*', (req, res) => {
    res.render('../Templates/NotFound')
})

