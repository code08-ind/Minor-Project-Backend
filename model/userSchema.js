const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    regno: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isBuyer: {
        type: Boolean,
        required: true
    },
    isSeller: {
        type: Boolean,
        required: true
    },
    currentAddress: {
        type: String,
        required: true
    },
    property: {
        type: String,
        required: false
    },
    balance: {
        type: String,
        required: true
    },
    bank: {
        type: String,
        required: true
    }
});

const Users = new mongoose.model('Users', userSchema);

module.exports = Users;
