//const User = require('./auth.Dao'); 
const { ITQCredentials } = require('./auth.Model');
const { ITQParticipants } = require('./auth.Model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'SECRETKEY123456';
const mongoose = require('mongoose');
const app = require('express')();


// Function to create a new user
exports.registerUser = (req, res, next) => {
    // Check if user already exists
    ITQCredentials.findOne({ name: req.body.name })
        .then(user => {
            if (user) {
                // If the user exists, send an error response
                return res.status(409).send('Name already exists');
            } else {
                // If the user does not exist, create a new user
                const newUser = new ITQCredentials({
                    name: req.body.name,
                    password: bcrypt.hashSync(req.body.password)
                });

                console.log(newUser);//Testing

                // Save the user in the database
                newUser.save()        
                    .then(user => {
                        // If the user is created successfully, create a new JWT token for them
                        const expiresIn = 24 * 60 * 60;
                        const accessToken = jwt.sign({ id: user.id },
                            SECRET_KEY, {
                                expiresIn: expiresIn
                            });
                        // Prepare the user data to be sent in the response
                        const dataUser = {
                            name: user.name,
                            accessToken: accessToken,
                            expiresIn: expiresIn
                        }
                        // Send the response with the user data
                        res.send({ dataUser });
                    })
                    .catch(err => {
                        // For any other errors, send a server error response
                        console.error('test');
                        console.error(err);
                        return res.status(500).send(`Server errorToken: ${err.message}`);
                        
                    });
            }
        })
        .catch(err => {
            // If there is an error checking for the user, send a server error response
            return res.status(500).send(`Server errorMongoDB: ${err.message}`);
        });
}

// Function to log in a user
exports.loginUser = (req, res, next) => {
    // Create a user object with the request data
  
    const userData = {
        name: req.body.name,
        password: req.body.password
    }
    
    console.log(userData); //Testing
    // check the name and the pasword in the ITQCredentials collection
    ITQCredentials.findOne({ name: userData.name })
    .then(user => {
            // If the user name is not found, send an error response
            if (!user) {
                res.status(409).send({ message: 'Something is wrong' }); 
            } else {
                // If found, check if the password is correct
                const resultPassword = bcrypt.compareSync(userData.password, user.password);
                // If it's correct, create a new JWT token for the user
                if (resultPassword) {
                    const expiresIn = 24 * 60 * 60;
                    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: expiresIn });
                    // Prepare the user data to be sent in the response
                    const dataUser = {
                        name: user.name,
                        accessToken: accessToken,
                        expiresIn: expiresIn
                    }
                    // Send the response with the user data
                    res.send({ dataUser });
                } else {
                    // If password is incorrect, send an error response
                    res.status(409).send({ message: 'Something is wrong' });
                }
            }
        })
        .catch(err => console.error(err));
}


exports.getAllParticipants = (req, res, next) => {
    ITQParticipants.find()
    .then(members => {
        console.log(members); 
        res.json(members);
    })
    .catch(err => {
        console.error(err); 
        res.status(500).json({ error: err });
    });
}

// Function to update the check-in status of a participant
exports.updateCheckIn = (req, res, next) => {
    // Get the participant id from the request
    const id = req.params.id;
    const newCheckInStatus = req.body.CheckIn;
    console.log(req.body.CheckIn); //Testing

    // Find the participant in the database and update their check-in status
    ITQParticipants.findById(id) 
        .then(participant => {
            console.log(id); //Testing
            if (!participant) {
                // If the participant was not found, send an error response
                return res.status(404).send('Participant not found');
            } else {
                // Set the check-in status of the participant to the new status
                participant.CheckIn = newCheckInStatus;
                // Save the updated participant
                participant.save()
                    .then(() => {
                    // Send the updated participant
                    res.send(participant.CheckIn.toString());
                    console.log(participant.CheckIn); //Testing
                })

                    .catch(err => {
                        // Log the error for debugging
                        console.error(err);
                        // If there was an error saving the participant, send a server error response
                        return res.status(500).send('Server error1');
                    });
            }
        })
        .catch(err => {
            // If there was an error finding the participant, send a server error response
            return res.status(500).send('Server error2');
        });
}

exports.updateCertificate = (req, res, next) => {
    // Get the participant id from the request
    const id = req.params.id;
    const newCertificateStatus = req.body.Certificate;
    console.log(req.body.Certificate); //Testing

    // Find the participant in the database and update their check-in status
    ITQParticipants.findById(id)
        .then(participant => {
            console.log(id); //Testing
            if (!participant) {
                // If the participant was not found, send an error response
                return res.status(404).send('Participant not found');
            } else {
                // Set the check-in status of the participant to the new status
                participant.Certificate = newCertificateStatus;
                // Save the updated participant
                participant.save()
                    .then(() => {
                        // Send the updated participant
                        res.send(participant.Certificate.toString());
                        console.log(participant.Certificate); //Testing
                    })

                    .catch(err => {
                        // Log the error for debugging
                        console.error(err);
                        // If there was an error saving the participant, send a server error response
                        return res.status(500).send('Server errorCertificate1');
                    });
            }
        })
        .catch(err => {
            // If there was an error finding the participant, send a server error response
            return res.status(500).send('Server errorCertificate2');
        });
}


exports.addParticipant = (req, res, next) => {
    // Create a new participant object with the request data
    const newParticipant = new ITQParticipants({
        Salutation: req.body.Salutation,
        Category: req.body.Category,
        "T-Shirt Size": req.body['T-Shirt Size'],
        "First Name": req.body['First Name'],
        "Last Name": req.body['Last Name'],
        "E-Mail": req.body['E-Mail'],
        "Mobile Number": req.body['Mobile Number'],
        CheckIn: 1,
        Certificate: req.body.Certificate
    });

    // Save the new participant in the database
    newParticipant.save()
        .then(participant => {
            // If the participant is created successfully, send a success response
            res.status(201).send(participant);
        })
        .catch(err => {
            // If there was an error saving the participant, send a server error response
            console.error(err);
            return res.status(500).send('Server error AddParticipant');
        });
}

// Function to get all users
exports.getAllUsers = (req, res, next) => {
    // Implement logic to get all users here
    ITQParticipants.find({}, (err, users) => {
        if (err) res.status(500).send(err);
        res.status(200).send(users);
      });
}

// Function to search users
exports.searchUsers = (req, res, next) => {
    const searchTerm = req.query.term.toLowerCase();

    User.find({
        $or: [
            { 'First Name': new RegExp(searchTerm, 'i') },
            { 'Last Name': new RegExp(searchTerm, 'i') },
            { 'E-Mail': new RegExp(searchTerm, 'i') },
            { 'Mobile Number': new RegExp(searchTerm, 'i') }
        ]
    }, (err, users) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(users);
    });
}

// Function to get a user by ID
exports.getUser = (req, res, next) => {
    ITQParticipants.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send('User not found');
        res.status(200).send(user);
    });
}

// Function to get a user by name
exports.getUserByName = (req, res, next) => {
    ITQParticipants.findOne({ name: req.params.name }, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send('User not found');
        res.status(200).send(user);
    });
}

// Function to get a user by email
exports.getUserByEmail = (req, res, next) => {
    ITQParticipants.findOne({ email: req.params.email }, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send('User not found');
        res.status(200).send(user);
    });
}

// Function to update a user
exports.updateUser = (req, res, next) => {
    ITQParticipants.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send('User not found');
        res.status(200).send(user);
    });
}

// Function to delete a user
exports.deleteUser = (req, res, next) => {
    ITQParticipants.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send('User not found');
        res.status(200).send('User deleted');
    });
}



// // Function addParticipant
// exports.addParticipant = (req, res, next) => {
//     // Check if a participant with the same first name, last name, email, and mobile number already exists
//     ITQParticipants.findOne({
//         'First Name': req.body.firstName,
//         'Last Name': req.body.lastName,
//         'E-Mail': req.body.email,
//         'Mobile Number': req.body.mobileNumber
//     })
//     .then(existingParticipant => {
//         if (existingParticipant) {
//             // If a participant with the same details already exists, send an error response
//             return res.status(400).send('Participant already exists');
//         } else {
//             // If no such participant exists, create a new participant object with the request data
//             const newParticipant = new ITQParticipants({
//                 Salutation: req.body.salutation,
//                 'First Name': req.body.firstName,
//                 'Last Name': req.body.lastName,
//                 'E-mail': req.body.email,
//                 'Mobile Number': req.body.mobileNumber,
//                 CheckIn: 1
//             });
//             // Save the new participant in the database
//             newParticipant.save()
//                 .then(participant => {
//                     res.status(201).send(participant);
//                     // If the participant is created successfully, send a success response
//                     //res.status(201).send('Participant added successfully');
//                 })
//                 .catch(err => {
//                     // If there was an error saving the participant, send a server error response
//                     console.error(err);
//                     return res.status(500).send('Server error');
//                 });
//         }
//     })
//     .catch(err => {
//         // If there was an error checking for the existing participant, send a server error response
//         console.error(err);
//         return res.status(500).send('Server error');
//     });
// }