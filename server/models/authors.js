const knex = require('./dbconnect')
const tableName = 'authors'



const getAuthors = () => {
    return knex.select(knex.raw('id_author, firstName, lastName, date_format(dateOfBirth, "%Y-%m-%d") as dateOfBirth, image')).from(tableName)
}

const createNewAuthor = (author) => {
    return knex(tableName).insert(author)
}

const getSingleAuthor = (authorId) => {
    return knex(tableName).where({ id_author: authorId }).select(knex.raw('id_author, firstName, lastName, date_format(dateOfBirth, "%Y-%m-%d") as dateOfBirth, image'))
}

const updateSingleAuthor = (authorId, author) => {
    return knex(tableName).where({ id_author: authorId }).update(author)
}

const deleteSingleAuthor = (authorId) => {
    return knex(tableName).where({ id_author: authorId }).del()
}

module.exports = {
    getAuthors_m: getAuthors,
    createNewAuthor_m: createNewAuthor,
    getSingleAuthor_m: getSingleAuthor,
    updateSingleAuthor_m: updateSingleAuthor,
    deleteSingleAuthor_m: deleteSingleAuthor
}