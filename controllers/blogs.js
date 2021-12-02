const app = require('express').Router()
const Blog = require('../models/blog')

app.get('/', (req, res) => {
    Blog.find({}).then(blogs => {
        res.json(blogs)
    })
})

app.get('/:id', (req, res, next) => {
    const { id } = req.params
    Blog.findById(id)
        .then(note => {
            if (note) {
                res.json(note)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/', (req, res, next) => {
    console.log(req.body)
    const { title, author, url, likes } = req.body
    const blog = new Blog({ title, author, url, likes })
    blog.save()
        .then(savedBlog => {
            res.json(savedBlog)
        })
        .catch(error => next(error))
})

app.delete('/:id', (req, res, next) => {
    const { id } = req.params
    Blog.findByIdAndRemove(id)
        .then(() => res.status(204).end())
        .catch(error => next(error))
})

app.put('/:id', (req, res, next) => {
    const { id } = req.params
    const { title, author, url, likes } = req.body
    const blog = { title, author, url, likes }
    Blog.findByIdAndUpdate(id, blog, { new: true })
        .then(updatedBlog => {
            res.json(updatedBlog)
        })
        .catch(error => next(error))
})

module.exports = app