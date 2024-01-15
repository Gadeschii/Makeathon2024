// Import the mongoose library
const mongoose = require('mongoose');

// Import the authSchema from the auth.Model file
const authSchema = require('./auth.Model');

// Add static methods to the authSchema
authSchema.statics = {
    // Create a new user
    create: function(data, cb) {
        // Create a new user with the provided data
        const user = new this(data);
        // Save the new user to the database
        user.save(cb);
    },
    // Login a user
    login: function(query, cb) {
        // Find a user in the database that matches the provided query
        this.find(query, cb);
    }
}

// Create a mongoose model with the authSchema and the name 'ITQ Members' collection.
const authModel = mongoose.model('ITQ Members', authSchema);

// Export the authModel
module.exports = authModel;