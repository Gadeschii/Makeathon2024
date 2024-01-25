// Import the mongoose library
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ITQCredentials} = require('./auth.Model');

// Define the static methods
// ITQCredentials.statics = {
//     // Create a new user
//     create: function(data, cb) {
//         // Create a new user with the provided data
//         const user = new this(data);
//         // Save the new user to the database
//         user.save(cb);
//     },
//     // Login a user
//     login: function(query, cb) {
//         // Find a user in the database that matches the provided query
//         this.find(query, cb);
//     }
// }

const newCredential = req.body;

ITQCredentials.create(newCredential, function(err, createdCredential) {
    if (err) {
        console.error('Error creating new credential:', err);
        return;
    }

    console.log('Created new credential:', createdCredential);
});