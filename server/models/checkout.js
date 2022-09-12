const mongoose = require('mongoose')

const checkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        default: "No Name"
    },
    qty: {
        type: Number,
        require: true,
        default: 1
    },
    cost: {
        type: Number,
        require: true,
        default: 0.00
    },
    item_id: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Checkout', checkoutSchema)