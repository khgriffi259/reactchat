const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    facebookUrl: {
        type: String
    },
    twitterUrl: {
        type: String
    },
    instagramUrl: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);