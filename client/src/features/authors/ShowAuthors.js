import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { deleteSingleAuthorAsync } from './authorsSlice'

import { Card, Container, Row, Col, Button } from 'react-bootstrap'
import styles from '../../style/authors/ShowAuthors.module.css'



export const ShowAuthors = () => {
    const dispatch = useDispatch()
    const authors = useSelector(state => state.authors)

    const handleDelete = (authorId) => {
        dispatch(deleteSingleAuthorAsync(authorId))
    }

    const rendAuthors = authors.map((author, index) =>
        <Row className={styles.row} key={index}>
            <Col className={styles.col} xs={4} sm={3} md={3} lg={3} xl={3}><span>{author.firstName}</span></Col>
            <Col className={styles.col} xs={4} sm={3} md={3} lg={3} xl={3}><span>{author.lastName}</span></Col>
            <Col className={styles.col} xs={0} sm={3} md={3} lg={2} xl={2}><span>{author.dateOfBirth}</span></Col>
            <Col className={styles.col} xs={4} sm={3} md={3} lg={4} xl={4}>
                <Link to={`/authors/details/${author.id_author}`}><Button variant="success" >Details</Button></Link>
                <Link to={`/authors/update/${author.id_author}`}><Button variant="warning" >Update</Button></Link>
                <Button variant="danger" onClick={() => handleDelete(author.id_author)} >Delete</Button>
            </Col>
        </Row>
    )

    return (
        <section className={styles.section}>
            <Card className={styles.card}>
                <Card.Header className={styles.cardheader}>
                    <Container fluid>
                        <Row className={styles.row}>
                            <Col className={styles.col} xs={4} sm={3} md={3} lg={3} xl={3}>First Name</Col>
                            <Col className={styles.col} xs={4} sm={3} md={3} lg={3} xl={3}>Last Name</Col>
                            <Col className={styles.col} xs={0} sm={3} md={3} lg={2} xl={2}>Date of Birth</Col>
                            <Col className={styles.col} xs={4} sm={3} md={3} lg={4} xl={4}>Action</Col>
                        </Row>
                    </Container>
                </Card.Header>
                <Card.Body className={styles.cardbody}>
                    <Container fluid>
                        {rendAuthors}
                    </Container>
                </Card.Body>
            </Card>
        </section>
    );
}


