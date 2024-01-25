//const User = require('./auth.Dao'); 
const { ITQCredentials } = require('./auth.Model');
const { ITQStaff } = require('./auth.Model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'SECRETKEY123456';
const mongoose = require('mongoose');
const app = require('express')();


// Function to create a new user
exports.registerUser = (req, res, next) => {
    console.log(req.body);//Testing

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
                        return res.status(500).send('Server error');
                    });
            }
        })
        .catch(err => {
            // If there is an error checking for the user, send a server error response
            return res.status(500).send('Server error');
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


exports.getAllMembers = (req, res, next) => {
    ITQCredentials.find({}, (err, members) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(members);
        }
    });
}

exports.getAllStaff = (req, res, next) => {
    ITQStaff.find({'Category': 'YT'})
    .then(members => {
        console.log(members); 
        res.json(members);
    })
    .catch(err => {
        console.error(err); 
        res.status(500).json({ error: err });
    });
}

// Function to get all users
exports.getAllUsers = (req, res, next) => {
    // Implement logic to get all users here
    ITQStaff.find({}, (err, users) => {
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
    ITQStaff.findById(req.params.id, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send('User not found');
        res.status(200).send(user);
    });
    
}
// Function to get a user by name
exports.getUserByName = (req, res, next) => {
    ITQStaff.findOne({ name: req.params.name }, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send('User not found');
        res.status(200).send(user);
    });
}

// Function to get a user by email
exports.getUserByEmail = (req, res, next) => {
    ITQStaff.findOne({ email: req.params.email }, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send('User not found');
        res.status(200).send(user);
    });
}

// Function to update a user
exports.updateUser = (req, res, next) => {
    ITQStaff.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send('User not found');
        res.status(200).send(user);
    });
}

// Function to delete a user
exports.deleteUser = (req, res, next) => {
    ITQStaff.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) return res.status(500).send(err);
        if (!user) return res.status(404).send('User not found');
        res.status(200).send('User deleted');
    });
}
