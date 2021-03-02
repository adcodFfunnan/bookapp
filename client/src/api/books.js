import axios from 'axios'



export const getBooks = () => axios.get('http://localhost:5000/books')

export const createNewBook = (book, accessToken) => axios.post('http://localhost:5000/books', book,
    {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

export const getSingleBook = (bookId) => axios.get(`http://localhost:5000/books/${bookId}`)

export const updateSingleBook = (book, accessToken) => axios.put(`http://localhost:5000/books/${book.id_book}`, book,
    {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

export const deleteSingleBook = (bookId, accessToken) => axios.delete(`http://localhost:5000/books/${bookId}`,
    {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

export const getAuthorsForBookId = (bookId) => axios.get(`http://localhost:5000/books/${bookId}/authors`)

export const createNewAuthorForBookId = (bookId, author, accessToken) => axios.post(`http://localhost:5000/books/${bookId}/authors`, author,
    {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

export const addExistingAuthorIdToBookId = (bookId, authorId, accessToken) => axios.post(`http://localhost:5000/books/${bookId}/authors/${authorId}`, {},
    {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

export const deleteAuthorIdForBookId = (bookId, authorId, accessToken) => axios.delete(`http://localhost:5000/books/${bookId}/authors/${authorId}`,
    {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })