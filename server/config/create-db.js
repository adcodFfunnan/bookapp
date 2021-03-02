require('dotenv').config()
const { books, authors } = require('./initialData.js')



const config = JSON.parse(process.env.CONFIGURATION)

const setdatabase = async () => {
    let knex = require('knex')({
        client: config.client,
        connection: {
            host: config.host,
            user: config.user,
            password: config.password
        }
    })

    try {
        await knex.raw(`CREATE DATABASE ${config.database}`)
        console.log(`Database ${config.database} created successfully`)
    } catch (err) { console.log(err.message) }

    await knex.destroy()
    knex = require('knex')({
        client: config.client,
        connection: {
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database
        }
    })

    try {
        console.log(`Creating table users...`)
        await knex.raw(`CREATE TABLE users(
            id_user SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
            name VARCHAR(50),
            password VARCHAR(255),
            refreshToken VARCHAR(255),
            PRIMARY KEY(id_user))`)
        console.log("Table 'users' created successfully")

        console.log(`Creating table books...`)
        await knex.raw(`CREATE TABLE books(
            id_book VARCHAR(36),
            isbn VARCHAR(50),
            title VARCHAR(100) NOT NULL,
            pages SMALLINT UNSIGNED,
            published SMALLINT UNSIGNED,
            image VARCHAR(255),
            PRIMARY KEY(id_book))`)
        console.log("Table 'books' created successfully")

        console.log(`Creating table authors...`)
        await knex.raw(`CREATE TABLE authors(
            id_author VARCHAR(36),
            firstName VARCHAR(50) NOT NULL,
            lastName VARCHAR(50),
            dateOfBirth DATE,
            image VARCHAR(255),
            PRIMARY KEY(id_author))`)
        console.log("Table 'authors' created successfully")

        console.log(`Creating table books_authors...`)
        await knex.raw(`CREATE TABLE books_authors(
            book_id VARCHAR(36),
            author_id VARCHAR(36),
            FOREIGN KEY (book_id) REFERENCES books(id_book) ON DELETE CASCADE,
            FOREIGN KEY (author_id) REFERENCES authors(id_author) ON DELETE CASCADE)`)
        console.log("Table 'books_authors' created successfully")


        console.log(`The database ${config.database} was successfully set up. Type 'npm start' to launch the application.`)

    } catch (err) { console.log(err.message) }

    try {
        console.log("Data entry into the database in progress...")
        await knex('books').insert(books)
        console.log("Data successfully entered into the table 'books'...")

        await knex('authors').insert(authors)
        console.log("Data successfully entered into the table 'authors'...")
    } catch (err) { console.log("Data entry to database failed") }

    await knex.destroy()
}

setdatabase()