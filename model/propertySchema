const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    regno: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required:true
    },
    estimatedPrice: {
        type: String,
        required:true
    }
});

const Properties = new mongoose.model('Properties', propertySchema);

module.exports = Properties;
