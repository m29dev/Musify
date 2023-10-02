const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const dbConnect = require('./config/dbConfig')
const authRoutes = require('./routes/authRoutes')
const accountRoutes = require('./routes/accountRoutes')
const http = require('http')

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const server = http.createServer(app)

dbConnect()
server.listen(3000, () => {
    console.log('app is runnin at port 3000')
})

//routes
app.use(authRoutes)
app.use(accountRoutes)
