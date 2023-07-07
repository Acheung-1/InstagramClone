const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '5d'})
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body 

    try {
        const user = await User.login(email, password)

        // create token
        const token = createToken(user._id)

        // res.status(200).json({firstName: User.firstName, lastName: User.lastName, username: User.username, email, token})
        res.status(200).json({email, token})
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

        // maybe dont need firstName...username
        res.status(200).json({firstName, lastName, username, email, token })
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = { loginUser, signUpUser }
