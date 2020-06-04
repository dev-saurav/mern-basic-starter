const express = require('express')
const mongoose = require('mongoose')

const items = require('./routes/api/items')

//initializations
const app = express()

//middlewares
app.use(express.json())
app.use('/api/items', items)

//DB config
const db = require('./config/keys').mongoURI

//connect to mongo atlas
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongo db is connected..."))
    .catch(err => console.log(err))

//listen
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server started on ${port}`))