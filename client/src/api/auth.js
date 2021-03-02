import axios from 'axios'



export const registerNewUser = (user) => axios.post('http://localhost:5000/users/register', user)

export const userLogin = (user) => axios.post('http://localhost:5000/users/login', user)

export const userLogout = (refreshToken) => axios.delete('http://localhost:5000/users/logout', { data: { refreshToken: refreshToken } })

export const refreshAccessToken = (accessToken, refreshToken) => axios.post('http://localhost:5000/users/refreshtoken', { refreshToken: refreshToken },
    {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }
)