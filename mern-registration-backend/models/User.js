// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            unique: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please enter a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
            minlength: 6,
        },
        address: {
            type: String,
            required: [true, 'Please enter your address'],
        },
        phoneNumber: {
            type: String,
            required: [true, 'Please enter your phone number'],
        },
        profilePicture: {
            type: String, // URL to the profile picture
            default: '',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
