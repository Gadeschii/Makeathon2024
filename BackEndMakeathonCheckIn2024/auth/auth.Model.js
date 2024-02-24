// Importing the mongoose module
const mongoose = require('mongoose');

// Importing the database URL from the properties file
const dbURL = require('../config/properties').DB;

// Connecting to the MongoDB database using mongoose
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

// Getting a reference to the database connection
const db = mongoose.connection;

// If there's an error connecting to the database, log the error
db.on('error', console.error.bind(console, 'connection error:'));

// Once the database connection is open, log a success message
db.once('open', function() {
  console.log("Connected to database!");
});

// Defining the schema for the ITQCredentials collection
const ITQCredentialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Creating the ITQCredentials model from the schema
const ITQCredentials = mongoose.model('ITQCredentials', ITQCredentialSchema, 'ITQCredentials');



// Defining the schema for the ITQParticipants collection
const ITQParticipantsSchema =  new mongoose.Schema({
    Salutation: String,
    'First Name': String,
    'Last Name': String,
    'E-Mail': String,
    'Mobile Number': String,
    CheckIn: Number,
    Certificate: Number

});

// Creating the ITQParticipants model from the schema
const ITQParticipants = mongoose.model('ITQParticipants', ITQParticipantsSchema, 'ITQParticipants');


// Exporting the ITQCredentials and ITQParticipants models
module.exports = { ITQCredentials, ITQParticipants };