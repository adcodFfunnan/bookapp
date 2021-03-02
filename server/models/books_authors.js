const knex = require('./dbconnect')
const tableName = 'books_authors'



const getAuthorsForBookId = (bookId) => {
    return knex(tableName).where({ book_id: bookId }).select('author_id')
}

const getBooksForAuthorId = (authorId) => {
    return knex(tableName).where({ author_id: authorId }).select('book_id')
}

const connectBookIdWithAuthorId = (bookId, authorId) => {
    return knex(tableName).insert({ book_id: bookId, author_id: authorId })
}

const disconnectBookIdFromAuthorId = (bookId, authorId) => {
    return knex(tableName).where({ book_id: bookId, author_id: authorId }).del()
}

module.exports = {
    getAuthorsForBookId_m: getAuthorsForBookId,
    getBooksForAuthorId_m: getBooksForAuthorId,
    connectBookIdWithAuthorId_m: connectBookIdWithAuthorId,
    disconnectBookIdFromAuthorId_m: disconnectBookIdFromAuthorId,
}