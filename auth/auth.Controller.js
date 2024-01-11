const User = require('./auth.Dao'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'SECRETKEY123456';

// Function to create a new user
exports.createUser = (req, res, next) => {
    // Create a new user object with the request data
    const newUser = new User( {
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password)
    });

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
            // If there is an error, check if it's a duplicate key error (user already exists)
            if (err && err.code === 11000) return res.status(409).send('Name already exists');
            // For any other errors, send a server error response
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
    // Find the user in the database
    User.findOne({ name: userData.name })
        .then(user => {
            // If the user is not found, send an error response
            if (!user) {
                res.status(409).send({ message: 'Something is wrong' });
            } else {
                // Continue with your logic here
                res.send({ user });
            }
        })
        .catch(err => {
            // If there is an error, send a server error response
            return res.status(500).send('Server error!');
        });
}