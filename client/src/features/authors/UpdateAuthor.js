import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { updateSingleAuthorAsync } from './authorsSlice.js'

import { Card, Form, Button } from 'react-bootstrap'
import styles from '../../style/authors/UpdateAuthor.module.css'



export const UpdateAuthor = (props) => {
    const dispatch = useDispatch()
    const { authorId } = props.match.params
    let Author = useSelector(state => state.authors.find(author => author.id_author === authorId))
    const [author, setAuthor] = useState(Author)

    const redirect = useSelector(state => state.notification.redirect)
    let history = useHistory()

    useEffect(() => {
        setAuthor(Author)
    }, [Author])
    useEffect(() => {
        if (redirect.redirect) history.push(redirect.address)
    }, [redirect.redirect, history, redirect.address])

    const handleChange = (e) => {
        const name = e.target.name
        let authorCopy = Object.assign({}, author)
        authorCopy[name] = (!e.target.value && name === 'dateOfBirth') ? null : e.target.value
        setAuthor(authorCopy)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let authorCopy = Object.assign({}, author)
        delete authorCopy.books
        dispatch(updateSingleAuthorAsync(authorCopy))
    }

    if (!author) return null
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