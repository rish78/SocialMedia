const mongoose = require('mongoose');

const CounterSchema = mongoose.Schema({
    _id:{
        type: String
    },
    sequence: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Counter", CounterSchema);