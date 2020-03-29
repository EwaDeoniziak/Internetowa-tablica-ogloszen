const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    notices: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Notice'
        }
    ]

});

module.exports = mongoose.model('User', UserSchema);