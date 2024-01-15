// Import the mongoose library
const mongoose = require('mongoose');
// Get the Schema constructor from mongoose
const Schema = mongoose.Schema;

// Define a new Schema for users
const userSchema = new Schema({
    // Define a 'name' property of type String
    // This property is required, will be trimmed, and must be unique
    name:{
        type: String,
        required: true,
        trim: true, // Trim removes whitespace from both ends of a string
        unique: true
    },
    // Define a 'password' property of type String
    // This property is required and will be trimmed
    password:{
        type: String,
        required: true,
        trim: true // Trim removes whitespace from both ends of a string
    }
},
{
    // Enable timestamps. This will add 'createdAt' and 'updatedAt' properties to the schema
    timestamps: true 
});

// Export the userSchema
module.exports = userSchema;