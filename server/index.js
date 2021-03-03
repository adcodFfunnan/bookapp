require('dotenv').config()
const express = require('express')
const cors = require('cors')

const authRouter = require('./routes/auth.js')
const booksRouter = require('./routes/books.js')
const authorsRouter = require('./routes/authors.js')



const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())

app.use('/', authRouter)
app.use('/', booksRouter)
app.use('/', authorsRouter)

app.listen(PORT, () => {
    console.log("server is running")
})
