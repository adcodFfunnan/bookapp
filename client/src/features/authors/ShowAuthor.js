import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getSingleAuthorAsync, deleteSingleAuthorAsync, addExistingBookIdToAuthorIdAsync, deleteBookIdForAuthorIdAsync } from './authorsSlice'
import { setNotification } from '../notification/notificationSlice'

import { Card, Button, Form, InputGroup } from 'react-bootstrap'
import styles from '../../style/authors/ShowAuthor.module.css'



const SearchSelect = (props) => {
    const dispatch = useDispatch()
    const books = useSelector(state => state.books)

    const [search, setSearch] = useState('')
    const [seletedBookId, setSeletedBookId] = useState(null)

    const listOfBooks = books.filter(book => (book.title).toLowerCase().includes(search.toLowerCase()))

    const rendBooks = listOfBooks.map((book, index) =>
        <Fragment key={index}>
            <option value={JSON.stringify(book)}>{book.title}</option>
        </Fragment>
    )

    const handleSearch = (e) => {
        const search = e.target.value
        setSearch(search)
        setSeletedBookId(null)
    }

    const handleSelect = (e) => {
        const book = JSON.parse(e.target.value)
        setSearch(book.title)
        setSeletedBookId(book.id_book)
    }

    const handleAdd = (e) => {
        if (seletedBookId)
            dispatch(addExistingBookIdToAuthorIdAsync(props.authorId, seletedBookId))
        else {
            const notification = { type: "danger", message: "", show: true, redirect: { redirect: false, address: "" } }
            notification.message = "Please select an book!"
            dispatch(setNotification(notification))
        }
    }

    return (
        <div className={`${styles.addExist} ${props.visibility ? null : styles.hide}`}>
            <Form>
                <InputGroup>
                    <Form.Control className={styles.search} value={search} onChange={handleSearch} placeholder="Search"></Form.Control>
                    <InputGroup.Append>
                        <Button variant="primary" onClick={handleAdd}>Add</Button>
                    </InputGroup.Append>
                </InputGroup>
                <Form.Control as="select" className={styles.select} multiple onClick={handleSelect}>
                    {rendBooks}
                </Form.Control>
            </Form>
        </div>
    )
}

const AuthorBooks = (props) => {
    const dispatch = useDispatch()
    const [showAddExist, setAddExist] = useState(false)

    const handleAddExist = () => {
        setAddExist(!showAddExist)
    }

    const handleRemove = (authorId, bookId) => {
        dispatch(deleteBookIdForAuthorIdAsync(authorId, bookId))
    }

    const rendBooks = props.author.books.map((book, index) =>
        <div key={index}>
            <Link to={`/books/details/${book.id_book}`}>
                <div>
                    <span>{book.title}</span>
                </div>
            </Link >
            <div>
                <Button variant="secondary" onClick={() => handleRemove(props.author.id_author, book.id_book)}>Remove</Button>
            </div>
        </div>
    )

    return (
        <div className={styles.authorBooks}>
            <h4>Books:</h4>
            <div>
                {rendBooks}
            </div>
            <div>
                <Link to={`/authors/${props.author.id_author}/books/create`}><Button variant="warning">AddNew</Button></Link>
                <Button variant="warning" onClick={handleAddExist}>AddExist</Button>
                <SearchSelect visibility={showAddExist}
                    authorId={props.author.id_author} />
            </div>
        </div>
    )
}

export const ShowAuthor = (props) => {
    const dispatch = useDispatch()
    const { authorId } = props.match.params
    const author = useSelector(state => state.authors.find(author => author.id_author === authorId))
    const imgsrc = (author && author.image) ? author.image : "https://i.pinimg.com/236x/cc/2e/0f/cc2e0f27493a149c50884396adc7f987.jpg"

    const handleDelete = (authorId) => {
        dispatch(deleteSingleAuthorAsync(authorId))
        window.history.back()
    }

    useEffect(() => {
        dispatch(getSingleAuthorAsync(authorId))
    }, [dispatch, authorId])

    if (!author) return null
    return (
        <section className={styles.section}>
            <Card className={styles.card}>
                <Card.Header as="h3" className={styles.cardH}>
                    {`${author.firstName} ${author.lastName}`}
                </Card.Header>
                <Card.Body className={styles.cardB}>
                    <Card.Img variant="top" src={imgsrc}></Card.Img>
                    <div className={styles.details}>
                        <AuthorBooks author={author} />
                        <div className={styles.info}>
                            <div>
                                <p>Date of birth: <span>{author.dateOfBirth}</span></p>
                            </div>
                            <div>
                                <Button variant="secondary" onClick={() => { window.history.back() }}>Back</Button>
                                <Button variant="danger" onClick={() => handleDelete(authorId)}>Delete</Button>
                                <Link to={`/authors/update/${author.id_author}`}><Button variant="primary" >Update</Button></Link>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </section>
    )
}