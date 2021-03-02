const { getAuthors_m, createNewAuthor_m, getSingleAuthor_m, updateSingleAuthor_m, deleteSingleAuthor_m } = require('../models/authors.js')
const { createNewBook_m, getSingleBook_m } = require('../models/books.js')
const { getBooksForAuthorId_m, connectBookIdWithAuthorId_m, disconnectBookIdFromAuthorId_m } = require('../models/books_authors.js')

const { v4: uuidv4 } = require('uuid')



const getAuthors = async (req, res) => {
    try {
        const data = await getAuthors_m()
        res.json(data)
    } catch {
        res.status(500).send()
    }
}

const createNewAuthor = async (req, res) => {
    try {
        const author = req.body
        author.id_author = uuidv4()
        await createNewAuthor_m(author)
        const data = await getSingleAuthor_m(author.id_author)
        res.status(201).json(data[0])
    } catch (e) {
        console.log(e.message)
        res.status(500).send()
    }
}

const getSingleAuthor = async (req, res) => {
    try {
        const authorId = req.params.authorId
        const data = await getSingleAuthor_m(authorId)
        if (!data.length) return res.status(404).send()
        res.json(data[0])
    } catch {
        res.status(500).send()
    }
}

const updateSingleAuthor = async (req, res) => {
    try {
        const authorId = req.params.authorId
        await updateSingleAuthor_m(authorId, req.body)

        const data = await getSingleAuthor_m(authorId)
        if (!data.length) return res.status(404).send()
        res.json(data[0])
    } catch {
        res.status(500).send()
    }
}

const deleteSingleAuthor = async (req, res) => {
    try {
        const authorId = req.params.authorId
        const data = await getSingleAuthor_m(authorId)
        if (!data.length) return res.status(404).send()
        await deleteSingleAuthor_m(authorId)
        res.status(200).send("The author has been successfully deleted!")
    } catch {
        res.status(500).send()
    }
}

const getBooksForAuthorId = async (req, res) => {
    try {
        const authorId = req.params.authorId
        const author = await getSingleAuthor_m(authorId)
        if (!author.length) return res.status(404).send("Not found author")

        const books = await getBooksForAuthorId_m(authorId)
        const data = await Promise.all(books.map(async book => {
            const response = await getSingleBook_m(book.book_id)
            return response[0]
        }))
        res.json(data)
    } catch {
        res.status(500).send()
    }
}

const createNewBookForAuthorId = async (req, res) => {
    try {
        let book = req.body
        const authorId = req.params.authorId
        book.id_book = uuidv4()

        const author = await getSingleAuthor_m(authorId)
        if (!author.length) return res.status(404).send("Not found author")

        await createNewBook_m(book)
        const data = await getSingleBook_m(book.id_book)
        book = data[0]
        await connectBookIdWithAuthorId_m(book.id_book, authorId)

        res.json(book)
    } catch {
        res.status(500).send()
    }
}

const addExistingBookIdToAuthorId = async (req, res) => {
    try {
        const bookId = req.params.bookId
        const authorId = req.params.authorId

        const author = await getSingleAuthor_m(authorId)
        if (!author.length) return res.status(404).send("Not found author")
        const book = await getSingleBook_m(bookId)
        if (!book.length) return res.status(404).send("Not found book")
        await connectBookIdWithAuthorId_m(bookId, authorId)

        res.json(book[0])
    } catch {
        res.status(500).send()
    }
}

const deleteBookIdForAuthorId = async (req, res) => {
    try {
        const bookId = req.params.bookId
        const authorId = req.params.authorId

        const author = await getSingleAuthor_m(authorId)
        if (!author.length) return res.status(404).send("Not found author")
        const book = await getSingleBook_m(bookId)
        if (!book.length) return res.status(404).send("Not found book")

        await disconnectBookIdFromAuthorId_m(bookId, authorId)
        res.status(200).send()
    } catch (e) {
        console.log(e.message)
        res.status(500).send()
    }
}

module.exports = {
    getAuthors: getAuthors,
    createNewAuthor: createNewAuthor,
    getSingleAuthor: getSingleAuthor,
    updateSingleAuthor: updateSingleAuthor,
    deleteSingleAuthor: deleteSingleAuthor,

    getBooksForAuthorId: getBooksForAuthorId,
    createNewBookForAuthorId: createNewBookForAuthorId,
    addExistingBookIdToAuthorId: addExistingBookIdToAuthorId,
    deleteBookIdForAuthorId: deleteBookIdForAuthorId,
}