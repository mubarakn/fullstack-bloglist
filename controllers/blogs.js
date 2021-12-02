const app = require('express').Router()
const Blog = require('../models/blog')

app.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
})

app.get('/:id', async (req, res) => {
    const { id } = req.params
    const blog = await Blog.findById(id)
    if (blog) {
        res.json(blog)
    } else {
        res.status(404).end()
    }
})

app.post('/', async (req, res) => {
    const { title, author, url, likes } = req.body
    const blog = new Blog({ title, author, url, likes })
    await blog.save()
    res.json(blog)
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params
    await Blog.findByIdAndRemove(id)
    res.status(204).end()
})

app.put('/:id', async (req, res) => {
    const { id } = req.params
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true })
    res.json(blog)
})

module.exports = app