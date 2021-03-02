import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { createNewAuthorAsync } from './authorsSlice'
import { createNewAuthorForBookIdAsync } from '../books/booksSlice'

import { Card, Form, Button } from 'react-bootstrap'
import styles from '../../style/authors/AddAuthor.module.css'



export const AddAuthor = (props) => {
    const dispatch = useDispatch()
    const Author = { firstName: "", lastName: "", dateOfBirth: null, image: "" }
    const [author, setAuthor] = useState(Author)
    const { bookId } = props.match.params

    const redirect = useSelector(state => state.notification.redirect)
    let history = useHistory()

    useEffect(() => {
        if (redirect.redirect) history.push(redirect.address)
    }, [redirect.redirect, history, redirect.address])

    const handleChange = (e) => {
        const name = e.target.name
        let authorCopy = Object.assign({}, author)
        authorCopy[name] = (!e.target.value && name === 'dateOfBirth') ? null : e.target.value
        setAuthor(authorCopy)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (bookId)
            dispatch(createNewAuthorForBookIdAsync(bookId, author))
        else
            dispatch(createNewAuthorAsync(author))
    }

    return (
        <section className={styles.section}>
            <Card className={styles.card}>
                <Card.Header as="h3" className={styles.cardH}>
                    {`${author.firstName} ${author.lastName}`}
                </Card.Header>
                <Card.Body className={styles.cardB}>
                    <Form className={styles.form} onSubmit={handleSubmit}>
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text"
                            placeholder="First name" name="firstName" onChange={handleChange} value={author.firstName} required />

                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text"
                            placeholder="Last name" name="lastName" onChange={handleChange} value={author.lastName} />

                        <Form.Label>Date of birth</Form.Label>
                        <Form.Control type="date"
                            name="dateOfBirth" onChange={handleChange} value={(author.dateOfBirth) ? author.dateOfBirth : ""} />

                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text"
                            placeholder="Image URL" name="image" onChange={handleChange} value={author.image} />

                        <Button variant="secondary" onClick={() => { window.history.back() }}>Back</Button>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </section>
    )
}