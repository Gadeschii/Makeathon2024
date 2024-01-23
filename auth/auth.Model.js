const mongoose = require('mongoose');

const ITQCredentialschema = {
    name: String,
    password: String
};

const ITQStaffSchema = {
    // your schema definition here
};
const ITQCredentials = mongoose.model('ITQCredentials', ITQCredentialschema);
const ITQStaff = mongoose.model('ITQStaff', ITQStaffSchema);
// Find and log all documents in the ITQCredentials collection
ITQCredentials.find()
.then(members => console.log(members))
.catch(err => console.error(err));

ITQStaff.find()
.then(members => console.log(members))
.catch(err => console.error(err));

module.exports = { ITQCredentials, ITQStaff };