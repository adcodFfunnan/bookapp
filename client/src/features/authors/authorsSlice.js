import { createSlice } from '@reduxjs/toolkit'

import { createNewBook } from '../books/booksSlice'
import { setNotification, resetNotification } from '../notification/notificationSlice'

import * as api from '../../api/authors'



const initialState = []
const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {
        getAuthors(state, action) {
            return action.payload
        },
        createNewAuthor(state, action) {
            state.push(action.payload)
        },
        updateSingleAuthor(state, action) {
            const { id_author } = action.payload
            let existingAuthorIndex = state.findIndex(author => author.id_author === id_author)
            if (existingAuthorIndex >= 0)
                state[existingAuthorIndex] = action.payload
        },
        deleteSingleAuthor(state, action) {
            const id_author = action.payload
            let authorIndex = state.findIndex(author => author.id_author === id_author)
            if (authorIndex >= 0)
                state.splice(authorIndex, 1)
        },
        addExistingBookIdToAuthorId(state, action) {
            const { id_author, book } = action.payload
            let authorIndex = state.findIndex(author => author.id_author === id_author)
            if (authorIndex >= 0)
                state[authorIndex].books.push(book)
        },
        deleteBookIdForAuthorId(state, action) {
            const { id_author, id_book } = action.payload
            let authorIndex = state.findIndex(author => author.id_author === id_author)
            if (authorIndex >= 0) {
                const authorBookIndex = state[authorIndex].books.findIndex(book => book.id_book === id_book)
                if (authorBookIndex >= 0)
                    state[authorIndex].books.splice(authorBookIndex, 1)
            }
        }
    }
})

const { getAuthors, updateSingleAuthor, deleteSingleAuthor, addExistingBookIdToAuthorId, deleteBookIdForAuthorId } = authorsSlice.actions
export const { createNewAuthor } = authorsSlice.actions

export const getAuthorsAsync = () => async (dispatch) => {
    try {
        const { data } = await api.getAuthors()
        const authors = data.map(author => Object.assign({}, author, { books: [] }))
        dispatch(getAuthors(authors))
    } catch (err) {
        const notification = { type: "danger", message: "", show: true, redirect: { redirect: false, address: "" } }
        if (err.response)
            notification.message = `${err.response.status} ${err.response.statusText} ${err.response.data}`
        else
            notification.message = err.message

        dispatch(setNotification(notification))
    }
}

export const createNewAuthorAsync = (author) => async (dispatch, getState) => {
    const notification = { type: "success", message: "", show: true, redirect: { redirect: false, address: "" } }
    try {
        const accessToken = getState().auth.accessToken
        const response = await api.createNewAuthor(author, accessToken)
        const author_res = Object.assign({}, response.data, { books: [] })
        dispatch(createNewAuthor(author_res))

        notification.redirect.redirect = true
        notification.redirect.address = `/authors/details/${response.data.id_author}`
        notification.message = `${response.status} ${response.statusText} - Author has been successfully created!`
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

export const getSingleAuthorAsync = (authorId) => async (dispatch) => {
    const notification = { type: "success", message: "", show: true, redirect: { redirect: false, address: "" } }
    try {
        let response = await api.getSingleAuthor(authorId)
        let author = response.data

        response = await api.getBooksForAuthorId(authorId)
        const authorBooks = response.data
        author.books = authorBooks

        dispatch(updateSingleAuthor(author))
    } catch (err) {
        notification.type = "danger"
        if (err.response)
            notification.message = `${err.response.status} ${err.response.statusText} ${err.response.data}`
        else
            notification.message = err.message

        dispatch(setNotification(notification))
    }
}

export const updateSingleAuthorAsync = (author) => async (dispatch, getState) => {
    const notification = { type: "success", message: "", show: true, redirect: { redirect: false, address: "" } }
    try {
        const accessToken = getState().auth.accessToken
        const response = await api.updateSingleAuthor(author, accessToken)
        const author_res = Object.assign({}, response.data, { books: [] })
        dispatch(updateSingleAuthor(author_res))

        notification.redirect.redirect = true
        notification.redirect.address = `/authors/details/${response.data.id_author}`
        notification.message = `${response.status} ${response.statusText} - The author has been successfully updated!`
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

export const deleteSingleAuthorAsync = (authorId) => async (dispatch, getState) => {
    const notification = { type: "success", message: "", show: true, redirect: { redirect: false, address: "" } }
    try {
        const accessToken = getState().auth.accessToken
        const response = await api.deleteSingleAuthor(authorId, accessToken)
        dispatch(deleteSingleAuthor(authorId))

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

export const createNewBookForAuthorIdAsync = (authorId, book) => async (dispatch, getState) => {
    const notification = { type: "success", message: "", show: true, redirect: { redirect: false, address: "" } }
    try {
        const accessToken = getState().auth.accessToken
        const response = await api.createNewBookForAuthorId(authorId, book, accessToken)
        const book_res = Object.assign({}, response.data, { authors: [] })
        dispatch(createNewBook(book_res))

        notification.redirect.redirect = true
        notification.redirect.address = `/authors/details/${authorId}`
        notification.message = `${response.status} ${response.statusText} - The book has been successfully added to author!`
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

export const addExistingBookIdToAuthorIdAsync = (authorId, bookId) => async (dispatch, getState) => {
    const notification = { type: "success", message: "", show: true, redirect: { redirect: false, address: "" } }
    try {
        const accessToken = getState().auth.accessToken
        const response = await api.addExistingBookIdToAuthorId(authorId, bookId, accessToken)
        dispatch(addExistingBookIdToAuthorId({ id_author: authorId, book: response.data }))

        notification.message = `${response.status} ${response.statusText} - The book has been successfully added to the author!`
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

export const deleteBookIdForAuthorIdAsync = (authorId, bookId) => async (dispatch, getState) => {
    const notification = { type: "success", message: "", show: true, redirect: { redirect: false, address: "" } }
    try {
        const accessToken = getState().auth.accessToken
        const response = await api.deleteBookIdForAuthorId(authorId, bookId, accessToken)
        dispatch(deleteBookIdForAuthorId({ id_author: authorId, id_book: bookId }))

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

export default authorsSlice.reducer
