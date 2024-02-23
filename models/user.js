const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    memberSince: {
        type: Date,
        default: Date.now
    }
})

// PRE-SAVE HOOK TO ENCRYP USER PASSWORDS ON SIGNUP //
userSchema.pre('save', function(next) {
    const user = this // retrieve current user document being saved
    if(!user.isModified('password')) return next() // if password has been modiefied, if not then next
    bcrypt.hash(user.password, 10, (err, hash)=> { // takes 3 args, plain text to be hashed, salt rounds, cb called after hashing is complete
        if (err) return next(err)
        user.password = hash // upon successful hashing, replaces the plain text password with the hashed one
        next()
}) 
})

// METHOD TO CHECK ENCRYPTED PASSWORD ON LOGIN //
userSchema.methods.checkPassword = function(passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch)=> {
        if (err) callback (err)
        return callback (null, isMatch)
    })
}

// METHOD TO REMOVE PASSWORD BEFORE SENDING TO FRONT END //
userSchema.methods.withoutPassword = function() {
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model('User', userSchema)