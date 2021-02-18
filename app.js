if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected To Mongoose'))


app.use('/', indexRouter)

app.listen(3000 || process.env.PORT, () => {
    console.log("Server is up")
})