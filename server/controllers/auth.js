require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { registerNewUser_m, getUsers_m, createRefreshToken_m, deleteRefreshToken_m } = require('../models/auth.js')



const registerNewUser = async (req, res) => {
    try {
        const users = await getUsers_m()
        let user = users.find(user => user.name == req.body.name)
        if (user) return res.status(400).send("Username already exists")

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        user = { name: req.body.name, password: hashedPassword }
        await registerNewUser_m(user)
        res.status(201).send("New user is successfully registered!")
    } catch {
        res.status(500).send()
    }
}

const userLogin = async (req, res) => {
    try {
        const users = await getUsers_m();
        const user = users.find(user => user.name == req.body.name)
        if (!user) return res.status(401).send('Invalid username or password!')

        if (!await bcrypt.compare(req.body.password, user.password))
            return res.status(401).send('Invalid username or password')

        const accessToken = generateAccessToken({ name: user.name })
        const refreshToken = jwt.sign({ name: user.name }, process.env.REFRESH_TOKEN_SECRET)
        user.refreshToken = refreshToken
        await createRefreshToken_m(user.name, user.refreshToken)
        res.json({ accessToken: accessToken, refreshToken: refreshToken })
    } catch {
        res.status(500).send()
    }
}

const userLogout = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken
        if (!refreshToken) return res.status(400).send()
        const users = await getUsers_m()
        const refreshTokens = users.map(user => user.refreshToken)
        if (!refreshTokens.includes(refreshToken)) return res.status(400).send()

        await deleteRefreshToken_m(refreshToken)
        res.status(200).send("You have successfully logged out!")
    } catch {
        res.status(500).send()
    }
}

const refreshAccessToken = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken
        if (!refreshToken) return res.status(403).send()
        const users = await getUsers_m()
        const refreshTokens = users.map(user => user.refreshToken)
        if (!refreshTokens.includes(refreshToken)) return res.status(403).send()

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).send()
            const accessToken = generateAccessToken({ name: user.name })
            res.json({ accessToken: accessToken })
        })
    } catch {
        res.status(500).send()
    }
}

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15min' })
}

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const accessToken = authHeader && authHeader.split(' ')[1]
        if (!accessToken) return res.status(401).send()

        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).send()
            next()
        })
    } catch {
        res.status(500).send()
    }
}

module.exports = {
    registerNewUser: registerNewUser,
    userLogin: userLogin,
    userLogout: userLogout,
    refreshAccessToken: refreshAccessToken,
    authenticateToken: authenticateToken
}