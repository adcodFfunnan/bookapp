require('dotenv').config()



const config = JSON.parse(process.env.CONFIGURATION)

const knex = require('knex')({
    client: config.client,
    connection: {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    }
})

module.exports = knex