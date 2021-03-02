import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { updateSingleBookAsync } from './booksSlice.js'

import { Card, Form, Button } from 'react-bootstrap'
import styles from '../../style/books/UpdateBook.module.css'



export const UpdateBook = (props) => {
    const dispatch = useDispatch()
    const { bookId } = props.match.params
    let Book = useSelector(state => state.books.find(book => book.id_book === bookId))
    const [book, setBook] = useState(Book)

    const redirect = useSelector(state => state.notification.redirect)
    let history = useHistory()

    useEffect(() => {
        setBook(Book)
    }, [Book])
    useEffect(() => {
        if (redirect.redirect) history.push(redirect.address)
    }, [redirect.redirect, history, redirect.address])

    const handleChange = (e) => {
        const name = e.target.name
        let bookCopy = Object.assign({}, book)
        bookCopy[name] = (!e.target.value && (name === 'pages' || name === 'published')) ? null : e.target.value
        setBook(bookCopy)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let bookCopy = Object.assign({}, book)
        delete bookCopy.authors
        dispatch(updateSingleBookAsync(bookCopy))
    }

    if (!book) return null
    return (
        <section className={styles.section}>
            <Card className={styles.card}>
                <Card.Header as="h3" className={styles.cardH}>
                    {book.title}
                </Card.Header>
                <Card.Body className={styles.cardB}>
                    <Form className={styles.form} onSubmit={handleSubmit}>
                        <Form.Label>Book Title</Form.Label>
                        <Form.Control type="text"
                            placeholder="Book Title" name="title" onChange={handleChange} value={book.title} required />

                        <Form.Label>Pages</Form.Label>
                        <Form.Control type="number"
                            placeholder="Pages" name="pages" onChange={handleChange} min="0" value={(book.pages) ? book.pages : ""} />

                        <Form.Label>Published</Form.Label>
                        <Form.Control type="number"
                            placeholder="Published" name="published" onChange={handleChange} min="0" value={(book.published) ? book.published : ""} />

                        <Form.Label>ISBN</Form.Label>
                        <Form.Control type="text"
                            placeholder="ISBN" name="isbn" onChange={handleChange} value={book.isbn} />

                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text"
                            placeholder="Image URL" name="image" onChange={handleChange} value={book.image} />

                        <Button variant="secondary" onClick={() => { window.history.back() }}>Back</Button>
                        <Button variant="primary" type="submit">Update</Button>
                    </Form>
                </Card.Body>
            </Card>
        </section>
    )
}