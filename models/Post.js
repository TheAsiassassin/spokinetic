const mongoose = require('mongoose') ; 

const PostSchema = mongoose.Schema({
    firstName: {
        type: String , 
        required: true
    },
    lastName: {
        type : String ,
        required: true 
    }, 
    date: {
        type:  Date,
        default: Date.now
    } 
}) ; 

module.exports = mongoose.model('Posts', PostSchema) ; //name will be posts, based off PostSchema
