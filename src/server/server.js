require('dotenv').config({ path: './src/server/.env' });

const express = require('express')
const postRoutes = require('./routes/posts')

// express app
const app = express()

// middleware
// making an edit
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/posts', postRoutes)


// listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})
