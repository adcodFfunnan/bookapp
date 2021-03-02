import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

import { Navigation } from './app/Navbar.js'

import { ShowBooks } from './features/books/ShowBooks.js'
import { AddBook } from './features/books/AddBook.js'
import { ShowBook } from './features/books/ShowBook.js'
import { UpdateBook } from './features/books/UpdateBook.js'

import { ShowAuthors } from './features/authors/ShowAuthors.js'
import { AddAuthor } from './features/authors/AddAuthor.js'
import { ShowAuthor } from './features/authors/ShowAuthor.js'
import { UpdateAuthor } from './features/authors/UpdateAuthor.js'

import { Notification } from './features/notification/Notification'

import { getBooksAsync } from './features/books/booksSlice.js';
import { getAuthorsAsync } from './features/authors/authorsSlice.js'




const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBooksAsync())
        dispatch(getAuthorsAsync())
    }, [dispatch])

    return (
        <div>
            <Notification />
            <Router>
                <Navigation />
                <Switch>
                    <Route exact path="/"><Redirect to="/books" /></Route>

                    <Route exact path="/books"><ShowBooks /></Route>
                    <Route exact path="/books/create" component={AddBook} />
                    <Route exact path="/books/details/:bookId" component={ShowBook} />
                    <Route exact path="/books/update/:bookId" component={UpdateBook} />
                    <Route exact path="/books/:bookId/authors/create" component={AddAuthor} />


                    <Route exact path="/authors"><ShowAuthors /></Route>
                    <Route exact path="/authors/create" component={AddAuthor} />
                    <Route exact path="/authors/details/:authorId" component={ShowAuthor} />
                    <Route exact path="/authors/update/:authorId" component={UpdateAuthor} />
                    <Route exact path="/authors/:authorId/books/create" component={AddBook} />
                </Switch>
            </Router>
        </div>
    )
}

export default App