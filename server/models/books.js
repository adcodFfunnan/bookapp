const knex = require('./dbconnect')
const tableName = 'books'



const getBooks = () => {
    return knex.select().from(tableName)
}

const createNewBook = (book) => {
    return knex(tableName).insert(book)
}

const getSingleBook = (bookId) => {
    return knex(tableName).where({ id_book: bookId }).select()
}

const updateSingleBook = (bookId, book) => {
    return knex(tableName).where({ id_book: bookId }).update(book)
}

const deleteSingleBook = (bookId) => {
    return knex(tableName).where({ id_book: bookId }).del()
}

module.exports = {
    getBooks_m: getBooks,
    createNewBook_m: createNewBook,
    getSingleBook_m: getSingleBook,
    updateSingleBook_m: updateSingleBook,
    deleteSingleBook_m: deleteSingleBook
}