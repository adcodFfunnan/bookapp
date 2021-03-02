import { createSlice } from '@reduxjs/toolkit'

import { createNewAuthor } from '../authors/authorsSlice'
import { setNotification, resetNotification } from '../notification/notificationSlice'

import * as api from '../../api/books'



const initialState = []
const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        getBooks(state, action) {
            return action.payload
        },
        createNewBook(state, action) {
            state.push(action.payload)
        },
        updateSingleBook(state, action) {
            const { id_book } = action.payload
            let bookIndex = state.findIndex(book => book.id_book === id_book)
            if (bookIndex >= 0)
                state[bookIndex] = action.payload
        },
        deleteSingleBook(state, action) {
            const id_book = action.payload
            let bookIndex = state.findIndex(book => book.id_book === id_book)
            if (bookIndex >= 0)
                state.splice(bookIndex, 1)
        },
        addExistingAuthorIdToBookId(state, action) {
            const { id_book, author } = action.payload
            let bookIndex = state.findIndex(book => book.id_book === id_book)
            if (bookIndex >= 0)
                state[bookIndex].authors.push(author)
        },
        deleteAuthorIdForBookId(state, action) {
            const { id_book, id_author } = action.payload
            let bookIndex = state.findIndex(book => book.id_book === id_book)
            if (bookIndex >= 0) {
                const bookAuthorIndex = state[bookIndex].authors.findIndex(author => author.id_author === id_author)
                if (bookAuthorIndex >= 0)
                    state[bookIndex].authors.splice(bookAuthorIndex, 1)
            }
        }
    }
})

const { getBooks, updateSingleBook, deleteSingleBook, addExistingAuthorIdToBookId, deleteAuthorIdForBookId } = booksSlice.actions
export const { createNewBook } = booksSlice.actions

export const getBooksAsync = () => async (dispatch) => {
    try {
        const { data } = await api.getBooks()
        const books = data.map(book => Object.assign({}, book, { authors: [] }))
        dispatch(getBooks(books))
    } catch (err) {
        const notification = { type: "danger", message: "", show: true, redirect: { redirect: false, address: "" } }
        if (err.response)
            notification.message = `${err.response.status} ${err.response.statusText} ${err.response.data}`
        else
            notification.message = err.message

        dispatch(setNotification(notification))
    }
}

export const createNewBookAsync = (book) => async (dispatch, getState) => {
    const notification = { type: "success", message: "", show: true, redirect: { redirect: false, address: "" } }
    try {
        const accessToken = getState().auth.accessToken
        const response = await api.createNewBook(book, accessToken)
        const book_res = Object.assign({}, response.data, { authors: [] })
        dispatch(createNewBook(book_res))

        notification.redirect.redirect = true
        notification.redirect.address = `/books/details/${response.data.id_book}`
        notification.message = `${response.status} ${response.statusText} - Book has been successfully created!`
        dispatch(setNotification(notification))
        setTimeout(() => { dispatch(resetNotification()) }, 3000)
    } catch (err) {
        notification.type = "danger"
        if (err.response)
            notification.message = `${err.response.status} ${err.response.statusText}\n${err.response.data}`
        else
            notification.message = err.message

        dispatch(setNotification(notification))
    }
}

export const getSingleBookAsync = (bookId) => async (dispatch) => {
    const notification = { type: "success", message: "", show: true, redirect: { redirect: false, address: "" } }
    try {
        let response = await api.getSingleBook(bookId)
        let book = response.data

        response = await api.getAuthorsForBookId(bookId)
        const bookAuthors = response.data
        book.authors = bookAuthors

        dispatch(updateSingleBook(book))
    } catch (err) {
        notification.type = "danger"
        if (err.response)
            notification.message = `${err.response.status} ${err.response.statusText} ${err.response.data}`
        else
            notification.message = err.message

        dispatch(setNotification(notification))
    }
}

export const updateSingleBookAsync = (book) => async (dispatch, getState) => {
    const notification = { type: "success", message: "", show: true, redirect: { redirect: false, address: "" } }
    try {
        const accessToken = getState().auth.accessToken
        const response = await api.updateSingleBook(book, accessToken)
        const book_res = Object.assign({}, response.data, { authors: [] })
        dispatch(updateSingleBook(book_res))

        notification.redirect.redirect = true
        notification.redirect.address = `/books/details/${response.data.id_book}`
        notification.message = `${response.status} ${response.statusText} - The book has been successfully updated!`
        dispatch(setNotification(notification))
        setTimeout(() => { dispatch(resetNotification()) }, 2000)
    } catch (err) {
        notification.type = "danger"
        if (err.response)
            notification.message = `${err.response.status} ${err.response.statusText} ${err.response.data}`
        else
            notification.message = err.message

        dispatch(setNotification(notification))
    }
}

export const deleteSingleBookAsync = (bookId) => async (dispatch, getState) => {
    const notification = { type: "success", message: "", show: true, redirect: { redirect: false, address: "" } }
    try {
        const accessToken = getState().auth.accessToken
        const response = await api.deleteSingleBook(bookId, accessToken)
        dispatch(deleteSingleBook(bookId))

        notification.message = `${response.status} ${response.statusText} - ${response.data}`
        dispatch(setNotification(notification))
        setTimeout(() => { dispatch(resetNotification()) }, 3000)
    } catch (err) {
        notification.type = "danger"
        if (err.response)
            notification.message = `${err.response.status} ${err.response.statusText}\n${err.response.data}`
        else
            notification.message = err.message

        dispatch(setNotification(notification))
    }
}

export const createNewAuthorForBookIdAsync = (bookId, author) => async (dispatch, getState) => {
    const notification = { type: "success", message: "", show: true, redirect: { redirect: false, address: "" } }
    try {
        const accessToken = getState().auth.accessToken
        const response = await api.createNewAuthorForBookId(bookId, author, accessToken)
        const author_res = Object.assign({}, response.data, { books: [] })
        dispatch(createNewAuthor(author_res))

        notification.redirect.redirect = true
        notification.redirect.address = `/books/details/${bookId}`
        notification.message = `${response.status} ${response.statusText} - The author has been successfully added to book!`
        dispatch(setNotification(notification))
        setTimeout(() => { dispatch(resetNotification()) }, 3000)
    } catch (err) {
        notification.type = "danger"
        if (err.response)
            notification.message = `${err.response.status} ${err.response.statusText} ${err.response.data}`
        else
            notification.message = err.message

        dispatch(setNotification(notification))
    }
}

export const addExistingAuthorIdToBookIdAsync = (bookId, authorId) => async (dispatch, getState) => {
    const notification = { type: "success", message: "", show: true, redirect: { redirect: false, address: "" } }
    try {
        const accessToken = getState().auth.accessToken
        const response = await api.addExistingAuthorIdToBookId(bookId, authorId, accessToken)
        dispatch(addExistingAuthorIdToBookId({ id_book: bookId, author: response.data }))

        notification.message = `${response.status} ${response.statusText} - The author has been successfully added to the book!`
        dispatch(setNotification(notification))
        setTimeout(() => { dispatch(resetNotification()) }, 3000)
    } catch (err) {
        notification.type = "danger"
        if (err.response)
            notification.message = `${err.response.status} ${err.response.statusText} ${err.response.data}`
        else
            notification.message = err.message

        dispatch(setNotification(notification))
    }
}

export const deleteAuthorIdForBookIdAsync = (bookId, authorId) => async (dispatch, getState) => {
    const notification = { type: "success", message: "", show: true, redirect: { redirect: false, address: "" } }
    try {
        const accessToken = getState().auth.accessToken
        const response = await api.deleteAuthorIdForBookId(bookId, authorId, accessToken)
        dispatch(deleteAuthorIdForBookId({ id_book: bookId, id_author: authorId }))

        notification.message = `${response.status} ${response.statusText} - The author has been successfully removed from book!`
        dispatch(setNotification(notification))
        setTimeout(() => { dispatch(resetNotification()) }, 3000)
    } catch (err) {
        notification.type = "danger"
        if (err.response)
            notification.message = `${err.response.status} ${err.response.statusText} ${err.response.data}`
        else
            notification.message = err.message

        dispatch(setNotification(notification))
    }
}

export default booksSlice.reducer
