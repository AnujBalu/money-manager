const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(express.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

const FormRoute = require('./Router/FormDataAccess.js')


const URI = 'mongodb+srv://AnujBalu16:AnujBalu%401234@cluster0.wjcs4.mongodb.net/MoneyManager?retryWrites=true&w=majority';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB: MoneyManager database'))
.catch(err => console.error('MongoDB connection error:', err));


const port = 3001
app.listen(port, () =>{
    console.log(`The server is running at port ${port}`)
})


app.use('/FormPost',FormRoute)


module.exports = app