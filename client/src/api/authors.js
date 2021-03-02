import axios from 'axios'



export const getAuthors = () => axios.get('http://localhost:5000/authors')

export const createNewAuthor = (author, accessToken) => axios.post('http://localhost:5000/authors', author,
    {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

export const getSingleAuthor = (authorId) => axios.get(`http://localhost:5000/authors/${authorId}`)

export const updateSingleAuthor = (author, accessToken) => axios.put(`http://localhost:5000/authors/${author.id_author}`, author,
    {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

export const deleteSingleAuthor = (authorId, accessToken) => axios.delete(`http://localhost:5000/authors/${authorId}`,
    {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

export const getBooksForAuthorId = (authorId) => axios.get(`http://localhost:5000/authors/${authorId}/books`)

export const createNewBookForAuthorId = (authorId, book, accessToken) => axios.post(`http://localhost:5000/authors/${authorId}/books`, book,
    {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

export const addExistingBookIdToAuthorId = (authorId, bookId, accessToken) => axios.post(`http://localhost:5000/authors/${authorId}/books/${bookId}`, {},
    {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

export const deleteBookIdForAuthorId = (authorId, bookId, accessToken) => axios.delete(`http://localhost:5000/authors/${authorId}/books/${bookId}`,
    {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })

