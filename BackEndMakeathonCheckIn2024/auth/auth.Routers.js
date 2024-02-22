// Import the user controller
const UsersController = require('./auth.Controller');

// Export a function that takes a router as an argument
module.exports = (router) => {
    // Route for logging in a user
    router.post('/login', UsersController.loginUser);

    // Route for registering a new user
    router.post('/register', UsersController.registerUser);

    // Add more routes as needed
    router.get('/users', UsersController.getAllUsers);
    router.get('/users/:id', UsersController.getUser);
    
  //  router.post('/users/create', UsersController.registerUser);
    router.put('/users/:id', UsersController.updateUser);
    router.delete('/users/:id', UsersController.deleteUser);
    router.get('/users/:term', UsersController.searchUsers);

    //Route for collection from database
    //router.get('/members', UsersController.getAllMembers);
    router.get('/participants', UsersController.getAllParticipants);

    //Route for collection from database
    router.put('/participants/checkin/:id', UsersController.updateCheckIn);

    router.post('/auth/addparticipant', UsersController.addParticipant);
    router.post('/addparticipant', UsersController.addParticipant);
}