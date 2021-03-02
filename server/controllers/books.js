const { getBooks_m, createNewBook_m, getSingleBook_m, updateSingleBook_m, deleteSingleBook_m } = require('../models/books.js')
const { createNewAuthor_m, getSingleAuthor_m } = require('../models/authors.js')
const { getAuthorsForBookId_m, connectBookIdWithAuthorId_m, disconnectBookIdFromAuthorId_m } = require('../models/books_authors.js')

const { v4: uuidv4 } = require('uuid')



const getBooks = async (req, res) => {
    try {
        const data = await getBooks_m()
        res.json(data)
    } catch {
        res.status(500).send()
    }
}

const createNewBook = async (req, res) => {
    try {
        const book = req.body
        book.id_book = uuidv4()
        await createNewBook_m(book)
        const data = await getSingleBook_m(book.id_book)
        res.status(201).json(data[0])
    } catch {
        res.status(500).send()
    }
}

const getSingleBook = async (req, res) => {
    try {
        const bookId = req.params.bookId
        const data = await getSingleBook_m(bookId)
        if (!data.length) return res.status(404).send()
        res.json(data[0])
    } catch {
        res.status(500).send()
    }
}

const updateSingleBook = async (req, res) => {
    try {
        const bookId = req.params.bookId
        await updateSingleBook_m(bookId, req.body)

        const data = await getSingleBook_m(bookId)
        if (!data.length) return res.status(404).send()
        res.json(data[0])
    } catch {
        res.status(500).send()
    }
}

const deleteSingleBook = async (req, res) => {
    try {
        const bookId = req.params.bookId
        const data = await getSingleBook_m(bookId)
        if (!data.length) return res.status(404).send()
        await deleteSingleBook_m(bookId)
        res.status(200).send("The book has been successfully deleted!")
    } catch {
        res.status(500).send()
    }
}

const getAuthorsForBookId = async (req, res) => {
    try {
        const bookId = req.params.bookId
        const book = await getSingleBook_m(bookId)
        if (!book.length) return res.status(404).send("Not found book")

        const authors = await getAuthorsForBookId_m(bookId)
        const data = await Promise.all(authors.map(async author => {
            const response = await getSingleAuthor_m(author.author_id)
            return response[0]
        }))
        res.json(data)
    } catch {
        res.status(500).send()
    }
}

const createNewAuthorForBookId = async (req, res) => {
    try {
        let author = req.body
        const bookId = req.params.bookId
        author.id_author = uuidv4()

        const book = await getSingleBook_m(bookId)
        if (!book.length) return res.status(404).send("Not found book")

        await createNewAuthor_m(author)
        const data = await getSingleAuthor_m(author.id_author)
        author = data[0]
        await connectBookIdWithAuthorId_m(bookId, author.id_author)

        res.json(author)
    } catch {
        res.status(500).send()
    }
}

const addExistingAuthorIdToBookId = async (req, res) => {
    try {
        const bookId = req.params.bookId
        const authorId = req.params.authorId

        const book = await getSingleBook_m(bookId)
        if (!book.length) return res.status(404).send("Not found book")
        const author = await getSingleAuthor_m(authorId)
        if (!author.length) return res.status(404).send("Not found author")
        await connectBookIdWithAuthorId_m(bookId, authorId)

        res.json(author[0])
    } catch {
        res.status(500).send()
    }
}

const deleteAuthorIdForBookId = async (req, res) => {
    try {
        const bookId = req.params.bookId
        const authorId = req.params.authorId

        const book = await getSingleBook_m(bookId)
        if (!book.length) return res.status(404).send("Not found book")
        const author = await getSingleAuthor_m(authorId)
        if (!author.length) return res.status(404).send("Not found author")

        await disconnectBookIdFromAuthorId_m(bookId, authorId)
        res.status(200).send()
    } catch (e) {
        console.log(e.message)
        res.status(500).send()
    }
}

module.exports = {
    getBooks: getBooks,
    createNewBook: createNewBook,
    getSingleBook,
    updateSingleBook,
    deleteSingleBook,

    getAuthorsForBookId: getAuthorsForBookId,
    createNewAuthorForBookId: createNewAuthorForBookId,
    addExistingAuthorIdToBookId: addExistingAuthorIdToBookId,
    deleteAuthorIdForBookId: deleteAuthorIdForBookId,
}