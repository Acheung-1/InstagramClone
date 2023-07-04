// login user
const loginUser = async (req, res) => {
    res.json({mssg: 'login user'})
}

// sign up user
const signUpUser = async (req, res) => {
    res.json({mssg: 'sign up user'})
}

module.expores = { loginUser, signUpUser }
