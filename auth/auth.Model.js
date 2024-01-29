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
    
    CheckIn: {
        type: Number,
        required: true
    },
    Category: {
        type: String,
        required: false
    },
    Country: {
        type: String,
        required: false
    },
    Salutation: {
        type: String,
        required: false
    },
    First_Name: {
        type: String,
        required: false
    },
    Last_Name: {
        type: String,
        required: false
    },
    E_Mail: {
        type: String,
        required: false
    },
    T_Shirt_Size: {
        type: String,
        required: false
    },
    Mobile_Number: {
        type: Number,
        required: false
    },
    Status: {
        type: String,
        required: false
    },
    Field_of_Studies: {
        type: String,
        required: false
    },
    Semester: {
        type: String,
        required: false
    },
    Age: {
        type: String,
        required: false
    }
});

// Creating the ITQParticipants model from the schema
const ITQParticipants = mongoose.model('ITQParticipants', ITQParticipantsSchema, 'ITQParticipants');


// Exporting the ITQCredentials and ITQParticipants models
module.exports = { ITQCredentials, ITQParticipants };