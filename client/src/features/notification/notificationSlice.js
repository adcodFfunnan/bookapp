import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    type: "",
    message: "",
    show: false,
    redirect: {
        redirect: false,
        address: ""
    }
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        resetNotification(state, action) {
            return { type: "", message: "", show: false, redirect: { redirect: false, address: "" } }
        }
    }
})

export const { setNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer