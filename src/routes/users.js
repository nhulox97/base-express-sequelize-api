const { users } = require('../controllers');
const middlewares = require('../middlewares');
const router = require('express').Router();

router.post('/users/login', users.loginUser);

router.post('/users/signin', users.signInUser);

router.get('/users', middlewares.authenticateToken, users.getUsers);

router.put('/users', middlewares.authenticateToken, users.updateUser);

module.exports = router;
