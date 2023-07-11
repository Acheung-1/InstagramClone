const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '5d'})
}

// login user
const loginUser = async (req, res) => {
    const { username, password } = req.body 

    try {
        const user = await User.login(username, password)

        // create token
        const token = createToken(user._id)
        // console.log(user)

        // can remove later
        const userAvatar = user.profilePicture
        const about = user.about

        // res.status(200).json({username, token})
        res.status(200).json({username, token, profilePicture: userAvatar, about})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

// sign up user
const signUpUser = async (req, res) => {
    const {firstName, lastName, username, email, password} = req.body

    try {
        const user = await User.signup(firstName, lastName, username, email, password)

        // create token
        const token = createToken(user._id)

        const userAvatar = user.profilePicture
        const about = user.about

        // res.status(200).json({firstName, lastName, username, email, token })
        res.status(200).json({firstName, lastName, username, email, token, profilePicture: userAvatar, about})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

// get profile picture
const getAvatar = async (req, res) => {
    const { username } = req.params

    const about = await User.findOne({ username }, {profilePicture: 1, about: 1})

    res.status(200).json(about)
}

// update profile picture
const updateAvatar = async (req, res) => {
    const { username } = req.params

    const user = await User.findOneAndUpdate({username: username}, {
        ...req.body
    })

    
    res.status(200).json({ about: user.about, profilePicture: user.profilePicture })
}


module.exports = { loginUser, signUpUser, getAvatar, updateAvatar }
