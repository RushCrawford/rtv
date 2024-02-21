const express = require('express')
const authRouter = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')


// SIGNUP, CREATE USER //
authRouter.post('/signup', (req,res,next)=> {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user)=> { // check to see if username exists
        if (err) {
            res.status(500)
            return next(err)
        }
        if (user) {
            res.status(403)
            return next(new Error('Username already taken')) // throws this error if username exists
        }
        const newUser = new User(req.body) // create new user if username is unique
        newUser.save((err, savedUser)=> { // save user
            if (err) {
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(savedUser.toObject(), process.env.SECRET) // attatch token
            res.status(201).send({ token, user: savedUser }) // send token and new user to frontend
        })
    })
})

// LOGIN //
authRouter.post('/login', (req,res,next)=> {
    User.findOne({ username: req.body.username.toLowerCase() } ,(err, user)=> { // check for username in db
        if (err) {
            res.status(500)
            return next(err)
        }
        if (!user) { // if user not found throw error
            res.status(403)
            return next(new Error('wrong username or password'))
        }
        if (req.body.password !== user.password) { // if found username, verify passwords match
            res.status(403)
            return next(new Error('wrong username or password'))
        }
        const token = jwt.sign(user.toObject(), process.env.SECRET) // attatch token
        res.status(200).send({ token, user }) // send token and new user to frontend
    })
})

module.exports = authRouter