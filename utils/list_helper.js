const _ = require('lodash')

const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    if (!blogs.length) return 0
    const reducer = (sum, item) => sum + item.likes

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
    if (!blogs.length) return null

    const likesArray = blogs.map(blog => blog.likes)
    return blogs[likesArray.indexOf(Math.max(...likesArray))]
}

const mostBlogs = blogs => {
    if (!blogs.length) return null
    const blogsObject = _.countBy(blogs, (blog => blog.author))
    const mappedBlogs = Object.keys(blogsObject).map(author => ({ author, blogs: blogsObject[author] }))
    const sortedBlogs = mappedBlogs.sort((a, b) => b.blogs - a.blogs)
    return sortedBlogs[0]
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }