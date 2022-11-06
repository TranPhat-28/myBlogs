const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Blog = require('./models/Blog')
require('dotenv').config()
var bodyParser = require('body-parser')
app.use(bodyParser.json())

// Connect to MongoDB
// MongoDB connection
const db = process.env.DATABASE_URL;
mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log('Connected to MongoDB'))
.catch(e => console.log(e.message));


// Fetch all blogs
app.get('/blogs', (req, res) => {
    Blog.find().then(data => {
        res.json(data)
    })
})

// POST to create new blog
app.post('/blogs', (req, res) => {
    const newBlog = new Blog({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    })

    newBlog.save().then(() => {
        res.sendStatus(200)
    })
    .catch(e => console.log(e))
})

// GET blogs content
app.get('/view/:id', (req, res) => {
    Blog.findOne({_id: req.params.id}).then((blog) => {
        //console.log(blog)
        res.json(blog)
    })
    .catch(e => console.log(e.message))
})

const PORT = process.env.port || 5000

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`)
})