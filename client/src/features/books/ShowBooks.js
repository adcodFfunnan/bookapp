import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { deleteSingleBookAsync } from './booksSlice'

import { Card, Container, Row, Col, Button } from 'react-bootstrap'
import styles from '../../style/books/ShowBooks.module.css'



export const ShowBooks = () => {
    const dispatch = useDispatch()
    const books = useSelector(state => state.books)

    const handleDelete = (bookId) => {
        dispatch(deleteSingleBookAsync(bookId))
    }

    const rendBooks = books.map((book, index) =>
        <Row className={styles.row} key={index}>
            <Col className={styles.col} xs={8} sm={3} md={3} lg={4} xl={4}><span>{book.title}</span></Col>
            <Col className={styles.col} xs={0} sm={3} md={3} lg={2} xl={2}><span>{book.isbn}</span></Col>
            <Col className={styles.col} xs={0} sm={2} md={2} lg={1} xl={1}><span>{book.pages}</span></Col>
            <Col className={styles.col} xs={0} sm={2} md={2} lg={1} xl={1}><span>{book.published}</span></Col>
            <Col className={styles.col} xs={4} sm={2} md={2} lg={4} xl={4}>
                <Link to={`/books/details/${book.id_book}`}><Button variant="success" >Details</Button></Link>
                <Link to={`/books/update/${book.id_book}`}><Button variant="warning" >Update</Button></Link>
                <Button variant="danger" onClick={() => handleDelete(book.id_book)} >Delete</Button>
            </Col>
        </Row>
    )

    return (
        <section className={styles.section}>
            <Card className={styles.card}>
                <Card.Header className={styles.cardheader}>
                    <Container fluid>
                        <Row className={styles.row}>
                            <Col className={styles.col} xs={8} sm={3} md={3} lg={4} xl={4}>Title</Col>
                            <Col className={styles.col} xs={0} sm={3} md={3} lg={2} xl={2}>ISBN</Col>
                            <Col className={styles.col} xs={0} sm={2} md={2} lg={1} xl={1}>Pages</Col>
                            <Col className={styles.col} xs={0} sm={2} md={2} lg={1} xl={1}>Published</Col>
                            <Col className={styles.col} xs={4} sm={2} md={2} lg={4} xl={4}>Action</Col>
                        </Row>
                    </Container>
                </Card.Header>
                <Card.Body className={styles.cardbody}>
                    <Container fluid>
                        {rendBooks}
                    </Container>
                </Card.Body>
            </Card>
        </section>
    );
}


