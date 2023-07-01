const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)