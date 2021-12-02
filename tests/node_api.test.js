const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const config = require('../utils/config')
const logger = require('../utils/logger')
const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: 'blog 1',
        author: 'mubarak',
        url: 'http://mubarak.com',
        likes: 1
    },
    {
        title: 'blog 2',
        author: 'mubarak',
        url: 'http://mubarak.com',
        likes: 12
    },
    {
        title: 'blog 3',
        author: 'sahib',
        url: 'http://sahib.com',
        likes: 3
    },
    {
        title: 'blog 3',
        author: 'sahib',
        url: 'http://sahib.com',
        likes: 3
    },
    {
        title: 'blog 3',
        author: 'sahib',
        url: 'http://sahib.com',
        likes: 3
    },
]

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch(error => {
        logger.error('error connecting to MongoDB:', error.message)
    })

beforeEach(async () => {
    await Blog.deleteMany({})
    for (const blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
}, 100000)

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('all blogs contains unique identifier as id', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    expect(firstBlog).toBeDefined()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('adding blog saves successfully', async () => {
    await api
        .post('/api/blogs')
        .send({
            title: 'Added new blog',
            author: 'Shabeer',
            url: 'http://shabeer.com',
            likes: 1
        })

    const result = await api.get('/api/blogs')
    expect(result.body).toHaveLength(initialBlogs.length + 1)
})

test('If likes property is missing in the request then it should defaults to 0', async () => {
    const response = await api
        .post('/api/blogs')
        .send({
            title: 'Check whether likes equals 0 if not specified',
            author: 'Mubarak',
            url: 'http://mubarak.com'
        })
    expect(response.body.likes).toBe(0)
})

afterAll(() => {
    mongoose.connection.close()
})