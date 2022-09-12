require('dotenv').config()

const express = require('express')
const app = express()

// Database connections
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', (error) => console.log("Connected to Database"))


const shopRouter = require('./routes/shop')
const checkoutRouter = require('./routes/checkout')

app.set('view engine', 'ejs')
app.set('views', 'D:/Crochet/server/views')

app.use(express.json())
app.use(express.static(__dirname + '/public'))

app.use(shopRouter)
app.use(checkoutRouter)

app.get('/', (req, res) => {
    res.render('index.ejs', {})
})

app.listen(9000, () => console.log('Server Started'))
