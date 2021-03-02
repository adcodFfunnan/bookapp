const knex = require('./dbconnect')
const tableName = 'users'



const getUsers = () => {
    return knex.select().table(tableName)
}

const registerNewUser = (user) => {
    return knex(tableName).insert(user)
}

const createRefreshToken = (name, refreshToken) => {
    return knex(tableName).where('name', name).update({ refreshToken: refreshToken })
}

const deleteRefreshToken = (refreshToken) => {
    return knex(tableName).where('refreshToken', refreshToken).update({ refreshToken: null })
}

module.exports = {
    getUsers_m: getUsers,
    registerNewUser_m: registerNewUser,
    createRefreshToken_m: createRefreshToken,
    deleteRefreshToken_m: deleteRefreshToken
}
