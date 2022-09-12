const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "No Name"
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0.00
    }
})

module.exports = mongoose.model('Shop', shopSchema)