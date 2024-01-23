const mongoose = require('mongoose');
const dbURL = require('./properties').DB;

module.exports = () => {
    // Connect to the MongoDB database using Mongoose
    mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`Mongo connected on ${dbURL}`)) // Log a successful connection
        .catch(err => console.log(`Connection has error ${err}`)) // Log an error if the connection fails

    // Close the Mongoose connection when the process is terminated
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log(`Mongo is disconnected`);
            process.exit(0)
        })
    })
}