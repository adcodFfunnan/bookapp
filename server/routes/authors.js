const express = require('express')
const { getAuthors, createNewAuthor, getSingleAuthor, updateSingleAuthor, deleteSingleAuthor } = require('../controllers/authors.js')
const { getBooksForAuthorId, createNewBookForAuthorId, addExistingBookIdToAuthorId, deleteBookIdForAuthorId } = require('../controllers/authors.js')
const { authenticateToken } = require('../controllers/auth.js')



const router = express.Router()

router.get('/authors', getAuthors)
router.post('/authors', authenticateToken, createNewAuthor)
router.get('/authors/:authorId', getSingleAuthor)
router.put('/authors/:authorId', authenticateToken, updateSingleAuthor)
router.delete('/authors/:authorId', authenticateToken, deleteSingleAuthor)



router.get('/authors/:authorId/books', getBooksForAuthorId)
router.post('/authors/:authorId/books', authenticateToken, createNewBookForAuthorId)
router.post('/authors/:authorId/books/:bookId', authenticateToken, addExistingBookIdToAuthorId)
router.delete('/authors/:authorId/books/:bookId', authenticateToken, deleteBookIdForAuthorId)



module.exports = router