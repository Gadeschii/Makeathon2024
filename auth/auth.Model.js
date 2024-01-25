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



// Defining the schema for the ITQStaff collection
const ITQStaffSchema =  new mongoose.Schema({
    CheckIn: {
        type: Number,
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: true
    },
    Salutation: {
        type: String,
        required: true
    },
    First_Name: {
        type: String,
        required: true
    },
    Last_Name: {
        type: String,
        required: true
    },
    E_Mail: {
        type: String,
        required: true
    },
    T_Shirt_Size: {
        type: String,
        required: true
    },
    Mobile_Number: {
        type: Number,
        required: true
    },
    Status: {
        type: String,
        required: true
    },
    Field_of_Studies: {
        type: String,
        required: true
    },
    Semester: {
        type: String,
        required: true
    },
    Age: {
        type: String,
        required: true
    }
});

// Creating the ITQStaff model from the schema
const ITQStaff = mongoose.model('ITQStaff', ITQStaffSchema, 'ITQStaff');


// The following code is for testing purposes. It fetches all documents in the ITQCredentials collection.
// It is currently commented out, so it won't be executed.
// ITQCredentials.find()
//  .then(members => console.log(members))
//  .catch(err => console.error(err));

// ITQStaff.find()
//  .then(members => console.log(members))
//  .catch(err => console.error(err));


// Exporting the ITQCredentials and ITQStaff models
module.exports = { ITQCredentials, ITQStaff };