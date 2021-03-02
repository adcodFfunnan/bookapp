import { createSlice } from '@reduxjs/toolkit'

import { setNotification, resetNotification } from '../notification/notificationSlice'

import * as api from '../../api/auth'



const initialState = {
    accessToken: "",
    refreshToken: "",
    userIsLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLogin(state, action) {
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            state.userIsLoggedIn = true
        },
        userLogout(state, action) {
            state.accessToken = ""
            state.refreshToken = ""
            state.userIsLoggedIn = false
        },
        refreshAccessToken(state, action) {
            state.accessToken = action.payload
        }
    }
})

const { userLogin, userLogout, refreshAccessToken } = authSlice.actions

export const registerNewUserAsync = (user) => async (dispatch) => {
    const notification = { type: "success", message: "", show: true, redirect: { redirect: false, address: "" } }
    try {
        const response = await api.registerNewUser(user)
        notification.message = `${response.status} ${response.statusText} ${response.data}`

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

export const userLoginAsync = (user) => async (dispatch) => {
    const notification = { type: "success", message: "", show: true, redirect: { redirect: false, address: "" } }
    try {
        const response = await api.userLogin(user)
        dispatch(userLogin(response.data))
        dispatch(refreshAccessTokenAsync())

        notification.message = `${response.status} ${response.statusText} - You have successfully logged in!`
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

export const userLogoutAsync = () => async (dispatch, getState) => {
    const notification = { type: "success", message: "", show: true, redirect: { redirect: false, address: "" } }
    try {
        const refreshToken = getState().auth.refreshToken
        const response = await api.userLogout(refreshToken)
        dispatch(userLogout())

        notification.message = `${response.status} ${response.statusText} ${response.data}`
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

export const refreshAccessTokenAsync = () => async (dispatch, getState) => {
    let userIsLoggedIn = null
    let accessToken = null
    const refreshToken = getState().auth.refreshToken

    const delay = 10 * 60 * 1000
    const accessTokenInterval = setInterval(async () => {
        try {
            userIsLoggedIn = getState().auth.userIsLoggedIn
            accessToken = getState().auth.accessToken
            if (userIsLoggedIn) {
                const { data } = await api.refreshAccessToken(accessToken, refreshToken)
                dispatch(refreshAccessToken(data.accessToken))
            } else
                clearInterval(accessTokenInterval)
        } catch {
            clearInterval(accessTokenInterval)
            const notification = { type: "danger", message: "", show: true, redirect: { redirect: false, address: "" } }
            notification.message = "An unexpected error occurred. You have been logged out. Please reload the page and try again"
            dispatch(userLogout())
            dispatch(setNotification(notification))
        }
    }, delay)
}

export default authSlice.reducer