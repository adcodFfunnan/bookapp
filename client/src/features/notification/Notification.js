import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { resetNotification } from './notificationSlice'

import { Alert } from 'react-bootstrap'



export const Notification = () => {
    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification)

    if (!notification.show) return null
    return (
        <Alert variant={notification.type} onClose={() => dispatch(resetNotification())} dismissible>
            {notification.message}
        </Alert>
    )
}