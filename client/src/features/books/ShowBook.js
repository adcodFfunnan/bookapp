import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getSingleBookAsync, deleteSingleBookAsync, addExistingAuthorIdToBookIdAsync, deleteAuthorIdForBookIdAsync } from './booksSlice'
import { setNotification } from '../notification/notificationSlice'

import { Card, Button, Form, InputGroup } from 'react-bootstrap'
import styles from '../../style/books/ShowBook.module.css'



const SearchSelect = (props) => {
    const dispatch = useDispatch()
    const authors = useSelector(state => state.authors)

    const [search, setSearch] = useState('')
    const [seletedAuthorId, setSeletedAuthorId] = useState(null)

    const listOfAuthors = authors.filter(author => (`${author.firstName} ${author.lastName}`).toLowerCase().includes(search.toLowerCase()))

    const rendAuthors = listOfAuthors.map((author, index) =>
        <Fragment key={index}>
            <option value={JSON.stringify(author)}>{`${author.firstName} ${author.lastName}`}</option>
        </Fragment>
    )

    const handleSearch = (e) => {
        const search = e.target.value
        setSearch(search)
        setSeletedAuthorId(null)
    }

    const handleSelect = (e) => {
        const author = JSON.parse(e.target.value)
        setSearch(`${author.firstName} ${author.lastName}`)
        setSeletedAuthorId(author.id_author)
    }

    const handleAdd = (e) => {
        if (seletedAuthorId)
            dispatch(addExistingAuthorIdToBookIdAsync(props.bookId, seletedAuthorId))
        else {
            const notification = { type: "danger", message: "", show: true, redirect: { redirect: false, address: "" } }
            notification.message = "Please select an author!"
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
                    {rendAuthors}
                </Form.Control>
            </Form>
        </div>
    )
}

const BookAuthors = (props) => {
    const dispatch = useDispatch()
    const [showAddExist, setAddExist] = useState(false)

    const handleAddExist = () => {
        setAddExist(!showAddExist)
    }

    const handleRemove = (bookId, authorId) => {
        dispatch(deleteAuthorIdForBookIdAsync(bookId, authorId))
    }

    const rendAuthors = props.book.authors.map((author, index) =>
        <div key={index}>
            <Link to={`/authors/details/${author.id_author}`}>
                <div>
                    <span>{`${author.firstName} ${author.lastName}`}</span>
                </div>
            </Link>
            <div>
                <Button variant="secondary" onClick={() => { handleRemove(props.book.id_book, author.id_author) }}>Remove</Button>
            </div>
        </div>
    )

    return (
        <div className={styles.bookAuthors}>
            <h4>Authors:</h4>
            <div>
                {rendAuthors}
            </div>
            <div>
                <Link to={`/books/${props.book.id_book}/authors/create`}><Button variant="warning">AddNew</Button></Link>
                <Button variant="warning" onClick={handleAddExist}>AddExist</Button>
                <SearchSelect visibility={showAddExist}
                    bookId={props.book.id_book} />
            </div>
        </div>
    )
}

export const ShowBook = (props) => {
    const dispatch = useDispatch()
    const { bookId } = props.match.params
    const book = useSelector(state => state.books.find(book => book.id_book === bookId))
    const imgsrc = (book && book.image) ? book.image : "https://i.pinimg.com/564x/1e/ca/82/1eca82fe3024f777a2b1b6d746cc17e5.jpg"

    const handleDelete = (bookId) => {
        dispatch(deleteSingleBookAsync(bookId))
        window.history.back()
    }

    useEffect(() => {
        dispatch(getSingleBookAsync(bookId))
    }, [dispatch, bookId])

    if (!book) return null
    return (
        <section className={styles.section}>
            <Card className={styles.card}>
                <Card.Header as="h3" className={styles.cardH}>
                    {book.title}
                </Card.Header>
                <Card.Body className={styles.cardB}>
                    <Card.Img variant="top" src={imgsrc}></Card.Img>
                    <div className={styles.details}>
                        <BookAuthors book={book} />
                        <div className={styles.info}>
                            <div>
                                <p>{book.published} <span>{`${book.pages} Pages`}</span></p>
                                <p>ISBN: <span>{book.isbn}</span></p>
                            </div>
                            <div>
                                <Button variant="secondary" onClick={() => { window.history.back() }}>Back</Button>
                                <Button variant="danger" onClick={() => handleDelete(bookId)}>Delete</Button>
                                <Link to={`/books/update/${book.id_book}`}><Button variant="primary" >Update</Button></Link>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </section>
    )
}