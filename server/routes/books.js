const express = require('express')
const { getBooks, createNewBook, getSingleBook, updateSingleBook, deleteSingleBook } = require('../controllers/books.js')
const { getAuthorsForBookId, createNewAuthorForBookId, addExistingAuthorIdToBookId, deleteAuthorIdForBookId } = require('../controllers/books.js')
const { authenticateToken } = require('../controllers/auth.js')



const router = express.Router()

router.get('/books', getBooks)
router.post('/books', authenticateToken, createNewBook)
router.get('/books/:bookId', getSingleBook)
router.put('/books/:bookId', authenticateToken, updateSingleBook)
router.delete('/books/:bookId', authenticateToken, deleteSingleBook)



router.get('/books/:bookId/authors', getAuthorsForBookId)
router.post('/books/:bookId/authors', authenticateToken, createNewAuthorForBookId)
router.post('/books/:bookId/authors/:authorId', authenticateToken, addExistingAuthorIdToBookId)
router.delete('/books/:bookId/authors/:authorId', authenticateToken, deleteAuthorIdForBookId)



module.exports = router