const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    }
},
{
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

module.exports = userSchema;