// Import the mongoose library
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ITQCredentials} = require('./auth.Model');

const newCredential = req.body;

ITQCredentials.create(newCredential, function(err, createdCredential) {
    if (err) {
        console.error('Error creating new credential:', err);
        return;
    }

    console.log('Created new credential:', createdCredential);
});