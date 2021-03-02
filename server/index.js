const express = require('express')
const cors = require('cors')

const authRouter = require('./routes/auth.js')
const booksRouter = require('./routes/books.js')
const authorsRouter = require('./routes/authors.js')



const app = express()

app.use(cors())
app.use(express.json())

app.use('/', authRouter)
app.use('/', booksRouter)
app.use('/', authorsRouter)

app.listen(5000, () => {
    console.log("server is running")
})
