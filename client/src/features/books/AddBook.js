import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { createNewBookAsync } from './booksSlice'
import { createNewBookForAuthorIdAsync } from '../authors/authorsSlice'

import { Card, Form, Button } from 'react-bootstrap'
import styles from '../../style/books/AddBook.module.css'



export const AddBook = (props) => {
    const dispatch = useDispatch()
    const Book = { title: "", pages: null, published: null, isbn: "", image: "" }
    const [book, setBook] = useState(Book)
    const { authorId } = props.match.params

    const redirect = useSelector(state => state.notification.redirect)
    let history = useHistory()

    useEffect(() => {
        if (redirect.redirect) history.push(redirect.address)
    }, [redirect.redirect, history, redirect.address])

    const handleChange = (e) => {
        const name = e.target.name
        let bookCopy = Object.assign({}, book)
        bookCopy[name] = (!e.target.value && (name === 'pages' || name === 'published')) ? null : e.target.value
        setBook(bookCopy)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (authorId)
            dispatch(createNewBookForAuthorIdAsync(authorId, book))
        else
            dispatch(createNewBookAsync(book))
    }

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
                            placeholder="Title" name="title" onChange={handleChange} value={book.title} required />

                        <Form.Label>Pages</Form.Label>
                        <Form.Control
                            placeholder="Pages" type="number" name="pages" onChange={handleChange} min="0" value={(book.pages) ? book.pages : ""} />

                        <Form.Label>Published</Form.Label>
                        <Form.Control
                            placeholder="Published" type="number" name="published" onChange={handleChange} min="0" value={(book.published) ? book.published : ""} />

                        <Form.Label>ISBN</Form.Label>
                        <Form.Control
                            placeholder="ISBN" type="text" name="isbn" onChange={handleChange} value={book.isbn} />

                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            placeholder="Image URL" type="text" name="image" onChange={handleChange} value={book.image} />

                        <Button variant="secondary" onClick={() => { window.history.back() }}>Back</Button>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </section>
    )
}