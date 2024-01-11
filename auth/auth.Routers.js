const Users = require ('./auth.Controller');
module.exports = (router) => {
    router.post('/login', Users.loginUser);
    router.post('/register', Users.createUser);
}