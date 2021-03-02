import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import booksReducer from '../features/books/booksSlice'
import authorsReducer from '../features/authors/authorsSlice'
import notificationReducer from '../features/notification/notificationSlice'



export default configureStore({
    reducer: {
        auth: authReducer,
        books: booksReducer,
        authors: authorsReducer,
        notification: notificationReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})