const Post = require('../models/postModel')
const mongoose = require('mongoose')

// get all posts
const getPosts = async(req, res) => {
    const posts = await Post.find({}).sort({createdAt: -1})

    res.status(200).json(posts)
}

// get a single post
const getPost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such post"})
    }

    const post = await Post.findById(id)
    
    if (!post) {
        return res.status(400).json({error: 'No such post exists'})
    }

    res.status(200).json(post)
}

// create a new post
const createPost = async(req, res) => {
    const { image, caption, likes } = req.body

    let emptyFields = []
    
    if (!image) {
        emptyFields.push('image')
    }

    if (!caption) {
        emptyFields.push('caption')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({error: `Fill in the required fileds: ${emptyFields}`, emptyFields})
    }

    // add to db
    try {
        const post = await Post.create({ image, caption, likes })
        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a post
const deletePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such post"})
    }

    const post = await Post.findOneAndDelete({_id: id})
    
    if (!post) {
        return res.status(400).json({error: 'No such post exists'})
    }

    res.status(200).json(post)
}

// update a post
const updatePost = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such post"})
    }

    const post = await Post.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    
    if (!post) {
        return res.status(400).json({error: 'No such post exists'})
    }

    res.status(200).json(post)
}

module.exports = {
    getPosts,
    getPost,
    createPost, 
    deletePost, 
    updatePost
}