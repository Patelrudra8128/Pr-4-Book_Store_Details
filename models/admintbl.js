const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    pages : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    }
})
const table = mongoose.model('store',adminSchema)
module.exports = table;