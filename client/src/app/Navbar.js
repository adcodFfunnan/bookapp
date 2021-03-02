import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { registerNewUserAsync, userLoginAsync, userLogoutAsync } from '../features/auth/authSlice'

import { Navbar, Nav, Button, Form, Dropdown } from 'react-bootstrap'


//SIGN UP//
const SignUp = () => {
    const [showSignUp, setShowSignUp] = useState(false)

    const handleDropDown = (e) => { setShowSignUp(e) }
    const closeForm = () => { setShowSignUp(false) }

    return (
        <Dropdown onToggle={handleDropDown} show={showSignUp}>
            <Dropdown.Toggle variant="warning" id="SignInDropDown">
                SignUp
                </Dropdown.Toggle>
            <Dropdown.Menu align="right" rootCloseEvent>
                <FormSignUp closeForm={closeForm} />
            </Dropdown.Menu>
        </Dropdown>
    )
}

const FormSignUp = (props) => {
    const dispatch = useDispatch()
    const User = { name: "", password: "", repPassword: "" }
    const [user, setUser] = useState(User)
    const [InValidPassword, setInValidPassword] = useState(false)

    const handleChange = (e) => {
        const name = e.target.name
        const userCopy = Object.assign({}, user)
        userCopy[name] = e.target.value
        setUser(userCopy)
        if (name === "repPassword") setInValidPassword(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (user.password === user.repPassword) {
            const userCopy = Object.assign({}, user)
            delete userCopy.repPassword
            dispatch(registerNewUserAsync(userCopy))
            setUser(User)
            props.closeForm()
        }
        else
            setInValidPassword(true)
    }

    return (
        <Form className="formLogIn" onSubmit={handleSubmit}>
            <Form.Text>Sign Up</Form.Text>
            <Form.Control placeholder="Username" name="name" onChange={handleChange} value={user.name} required></Form.Control>
            <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} value={user.password} required></Form.Control>
            <Form.Control type="password" placeholder="Repeat password" name="repPassword" onChange={handleChange} value={user.repPassword} isInvalid={InValidPassword} required></Form.Control>
            <Form.Control.Feedback type="invalid">
                Passwords do not match
            </Form.Control.Feedback>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}

//LOGIN//
const LogIn = () => {
    const [showLogIn, setShowLogIn] = useState(false)
    const userIsLoggedIn = useSelector(state => state.auth.userIsLoggedIn)

    const handleDropDown = (e) => { setShowLogIn(e) }
    const closeForm = () => { setShowLogIn(false) }

    if (userIsLoggedIn) return <LogOut />
    return (
        <Dropdown onToggle={handleDropDown} show={showLogIn}>
            <Dropdown.Toggle variant="warning" id="SignInDropDown">
                Login
                </Dropdown.Toggle>
            <Dropdown.Menu align="right" rootCloseEvent>
                <FormLogIn closeForm={closeForm} />
            </Dropdown.Menu>
        </Dropdown>
    )
}

const FormLogIn = (props) => {
    const dispatch = useDispatch()
    const User = { name: "", password: "" }
    const [user, setUser] = useState(User)

    const handleChange = (e) => {
        const name = e.target.name
        let userCopy = Object.assign({}, user)
        userCopy[name] = e.target.value
        setUser(userCopy)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(userLoginAsync(user))
        setUser(User)
        props.closeForm()
    }

    return (
        <Form className="formLogIn" onSubmit={handleSubmit}>
            <Form.Text>Login</Form.Text>
            <Form.Control placeholder="Username" name="name" onChange={handleChange} value={user.name} required></Form.Control>
            <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange} value={user.password} required></Form.Control>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}

const LogOut = () => {
    const dispatch = useDispatch()
    const handleLogout = () => { dispatch(userLogoutAsync()) }

    return <Button className="logout" variant="success" onClick={handleLogout}>Logout</Button>
}

// NAVBAR //
export const Navigation = () => {
    const location = useLocation()
    let locationKey = ""
    if (location.pathname.includes('books')) locationKey = "books"
    else if (location.pathname.includes('authors')) locationKey = "authors"

    const [activeKey, setActiveKey] = useState(locationKey)

    useEffect(() => {
        setActiveKey(locationKey)
    }, [locationKey])

    return (
        <section className="section">
            <Navbar collapseOnSelect variant="dark" expand="md">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav activeKey={activeKey} className="mr-auto">
                        <Nav.Link as={Link} to="/books" eventKey="books">Books</Nav.Link>
                        <Nav.Link as={Link} to="/authors" eventKey="authors">Authors</Nav.Link>
                    </Nav>
                    <Nav className="right" >
                        <Nav.Link as={Link} to={(locationKey === 'books') ? "/books/create" : "/authors/create"}><Button className="addNewBook" variant="warning">{(locationKey === 'books') ? "AddNewBook" : "AddNewAuthor"}</Button></Nav.Link>
                        <LogIn />
                        <SignUp />
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </section >
    )
}