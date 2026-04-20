const mongoose = require('mongoose')
//to define fixed schema for data
const couseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

})
//name of model should be single and start with uppercase letter 
//refer to (courses collection) to be its schema and model
module.exports = mongoose.model('Course', couseSchema)